import { type Database as DB } from '@/lib/database.types'

declare global {
    type Database = DB
    type User = DB['public']['Tables']['users']['Row']
    type Command = DB['public']['Tables']['commands']['Row']
    type CommandInsert = DB['public']['Tables']['commands']['Insert']
    type CommandHistory = DB['public']['Tables']['command_history']['Row']
}