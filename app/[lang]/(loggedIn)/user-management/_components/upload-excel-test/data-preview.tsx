import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

interface DataPreviewProps {
  data: any[]
  sheetName: string
}

export function DataPreview({ data, sheetName }: DataPreviewProps) {
  if (!data || data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No Data</CardTitle>
          <CardDescription>No data found in sheet: {sheetName}</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  const headers = Object.keys(data[0])

  // Agent ID agentID
  // Agent Name agentName
  // Domain Name domainName
  // Operator ID  operatorID
  // Role role
  // Team section
  // Center center
  // Status status
  const requiredColumns = [
    'Agent ID',
    'Agent Name',
    'Domain Name',
    'Operator ID',
    'Role',
    'Team',
    'Center',
    'Status'
  ]
  const hasRequiredColumns = requiredColumns.every(col =>
    headers.some(header => header.toLowerCase() === col.toLowerCase())
  )

  return (
    <Card>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <div>
            <CardTitle>Data Preview - {sheetName}</CardTitle>
            <CardDescription>{data.length} rows found</CardDescription>
          </div>
          <div className='flex gap-2'>
            {hasRequiredColumns ? (
              <Badge variant='default' className='bg-green-600'>
                Valid Format
              </Badge>
            ) : (
              <Badge variant='destructive'>Missing Required Columns</Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className='h-64 w-full'>
          <Table>
            <TableHeader>
              <TableRow>
                {headers.map(header => (
                  <TableHead key={header} className='whitespace-nowrap'>
                    {header}
                    {requiredColumns.includes(header.toLowerCase()) && (
                      <span className='text-red-500 ml-1'>*</span>
                    )}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.slice(0, 10).map((row, index) => (
                <TableRow key={index}>
                  {headers.map(header => (
                    <TableCell key={header} className='whitespace-nowrap'>
                      {row[header] || '-'}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {data.length > 10 && (
            <div className='text-center text-sm text-muted-foreground mt-2'>
              Showing first 10 rows of {data.length} total rows
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
