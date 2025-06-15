<?php
$current = basename($_SERVER['PHP_SELF']);
?>
<!DOCTYPE html>
<html lang="cs">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Zakázkové dámské krejčovství Věry Čončkové</title>
  <meta name="description" content="Zakázkové dámské krejčovství v regionu Opava a Ostrava">
  <link rel="stylesheet" href="styles.css">
</head>
<body>
<header class="modern-header">
  <div class="nav-container">
    <a href="index.php" class="logo">Věra Čončková</a>
    <nav class="main-nav">
      <ul>
        <li><a href="index.php"<?php if ($current == 'index.php') echo ' class="active"'; ?>>Úvod</a></li>
        <li><a href="cenik.php"<?php if ($current == 'cenik.php') echo ' class="active"'; ?>>Ceník</a></li>
        <li><a href="galerie.php"<?php if ($current == 'galerie.php') echo ' class="active"'; ?>>Galerie</a></li>
        <li><a href="kontakt.php"<?php if ($current == 'kontakt.php') echo ' class="active"'; ?>>Kontakt</a></li>
      </ul>
    </nav>
  </div>
</header>
<main>

