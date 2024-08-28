export const SUGGESTIONS_COMMANDS = [
  {
    title: 'Abrir perfil de Instagram',
    description: 'Abre el perfil de Instagram de un usuario',
    command: 'open https://www.instagram.com/i.am.yare/',
    os: 'darwin'
  },
  {
    title: 'Abrir Explorador de Archivos',
    description: 'Abre el Explorador de Archivos en Windows',
    command: 'explorer',
    os: 'win32'
  },
  {
    title: 'Abrir Netflix en el navegador y subir el volumen al 50%',
    description: 'Abre Netflix y ajusta el volumen del sistema al 50%',
    command:
      'open https://www.netflix.com/ && osascript -e "set volume output volume 50"',
    os: 'darwin'
  },
  {
    title: 'Apagar el sistema',
    description: 'Apaga la computadora',
    command: 'shutdown /s',
    os: 'win32'
  },
  {
    title: 'Abrir aplicación de Spotify',
    description: 'Abre la aplicación de Spotify en el sistema',
    command: 'open -a Spotify',
    os: 'darwin'
  },
  {
    title: 'Silenciar volumen',
    description: 'Silencia el volumen del sistema',
    command: 'osascript -e "set volume output muted true"',
    os: 'darwin'
  }
]
