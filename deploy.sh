#!/bin/bash

# Default: exclude images
INCLUDE_IMAGES=false
# Default: deploy to root
DEPLOY_SUBDIR=""

# Parse command line arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        --include-images)
            INCLUDE_IMAGES=true
            shift
            ;;
        --exclude-images)
            INCLUDE_IMAGES=false
            shift
            ;;
        --subdir)
            DEPLOY_SUBDIR="$2"
            shift 2
            ;;
        -h|--help)
            echo "Usage: $0 [--include-images|--exclude-images] [--subdir <nazev>]"
            echo "  --include-images    Upload images along with other files"
            echo "  --exclude-images    Skip image uploads (default)"
            echo "  --subdir <nazev>    Deploy to subdirectory on FTP (e.g. test)"
            exit 0
            ;;
        *)
            echo "Unknown option: $1"
            echo "Use --help for usage information"
            exit 1
            ;;
    esac
done

# Get FTP password
while [ -z "$PASS" ]; do
    echo "Password: "
    read -s PASS
done

if [ -n "$DEPLOY_SUBDIR" ]; then
    echo "Deploying to subdirectory: $DEPLOY_SUBDIR"
    FTP_TARGET="www/$DEPLOY_SUBDIR"
else
    FTP_TARGET="www"
fi

echo "Deploy mode: $([ "$INCLUDE_IMAGES" = true ] && echo "including images" || echo "excluding images")"
echo "Starting deployment..."

upload() 
{
    local dir=$1
    
    # Calculate remote directory path
    local remote_dir=""
    if [ "$dir" != "." ]; then
        remote_dir="$dir/"
    fi
    
    # List all files, always exclude directories, dotfiles, and node_modules
    local all_files=$(ls -AF "$dir" 2>/dev/null | grep -v '[/@]$' | grep -v '^\.' | grep -v '^node_modules$')
    
    # Filter files based on image inclusion setting
    local files
    if [ "$INCLUDE_IMAGES" = false ]; then
        files=$(echo "$all_files" | grep -viE '\.(jpg|jpeg|png|gif|svg|webp|bmp|tiff)$')
    else
        files="$all_files"
    fi
    
    # Upload each file
    for file in $files; do
        local path="$dir/$file"
        if [ -f "$path" ]; then
            echo "# Uploading $path"
            # Upload to correct FTP path without double slashes
            curl -T "$path" "ftp://ftpx.forpsi.com/$FTP_TARGET/${remote_dir}$file" --user www.conckova.cz:$PASS --ftp-create-dirs
        fi
    done

    # Recursively process subdirectories (always excluding dotdirs and node_modules)
    for subdir in $(ls -d "$dir"/*/ 2>/dev/null | grep -v '/\.[^/]*/$' | grep -v '/node_modules/$'); do
        upload "$(echo $subdir | sed 's/\/$//g')"
    done
}

upload .