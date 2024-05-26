import { Gauge, History, MonitorSmartphone, SquareTerminal } from "lucide-react";

export const Titles = [
    {
        href: '/exc',
        title: 'Dashboard',
        label: 'Dashboard',
        icon: Gauge
    },
    {
        href: '/exc/commands',
        title: 'Commands',
        label: 'Comandos',
        icon: SquareTerminal
    },
    {
        href: '/exc/devices',
        title: 'Devices',
        label: 'Dispositivos',
        icon: MonitorSmartphone
    },
    {
        href: '/exc/history',
        title: 'History',
        label: 'Historial',
        icon: History
    }
]