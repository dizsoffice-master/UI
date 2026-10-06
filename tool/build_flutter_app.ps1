$ErrorActionPreference = 'Stop'

$repoRoot = Split-Path -Parent $PSScriptRoot
$buildOutput = Join-Path $repoRoot 'build\dizs-flutter-app'
$webRoot = Join-Path $repoRoot 'web'
$appOutput = Join-Path $webRoot 'app'
$expectedAppOutput = [System.IO.Path]::GetFullPath((Join-Path $webRoot 'app'))

& flutter build web --output $buildOutput
if ($LASTEXITCODE -ne 0) {
  exit $LASTEXITCODE
}

$indexHtml = @'
<!doctype html>
<html lang="en">
<head>
  <base href="/app/">
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="DIZS business workspace">
  <meta name="theme-color" content="#102a43">
  <title>DIZS Business Workspace</title>
  <script src="flutter_bootstrap.js" async></script>
</head>
<body></body>
</html>
'@

$utf8NoBom = New-Object System.Text.UTF8Encoding $false
[System.IO.File]::WriteAllText((Join-Path $buildOutput 'index.html'), $indexHtml, $utf8NoBom)

if ([System.IO.Path]::GetFullPath($appOutput) -ne $expectedAppOutput -or
    [System.IO.Path]::GetFullPath($webRoot) -eq [System.IO.Path]::GetFullPath($appOutput)) {
  throw 'Refusing to copy Flutter output to an unexpected path.'
}

if (Test-Path -LiteralPath $appOutput) {
  Remove-Item -LiteralPath $appOutput -Recurse -Force
}

New-Item -ItemType Directory -Path $appOutput | Out-Null
$rootFiles = @(
  'flutter_bootstrap.js',
  'flutter.js',
  'flutter_service_worker.js',
  'main.dart.js',
  'version.json',
  'index.html'
)

foreach ($file in $rootFiles) {
  $source = Join-Path $buildOutput $file
  if (-not (Test-Path -LiteralPath $source -PathType Leaf)) {
    throw "Required Flutter web build output is missing: $file"
  }
  Copy-Item -LiteralPath $source -Destination $appOutput
}

foreach ($directory in @('assets', 'canvaskit')) {
  $source = Join-Path $buildOutput $directory
  if (-not (Test-Path -LiteralPath $source -PathType Container)) {
    throw "Required Flutter web build directory is missing: $directory"
  }
  Copy-Item -LiteralPath $source -Destination $appOutput -Recurse
}

Write-Output "Flutter login app built for /app/ at $appOutput"
