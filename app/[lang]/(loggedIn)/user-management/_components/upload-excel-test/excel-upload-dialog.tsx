'use client'

import type React from 'react'
import { useState, useRef } from 'react'
import {
  FileSpreadsheet,
  X,
  Check,
  Download,
  CloudUpload
} from 'lucide-react'
import * as XLSX from 'xlsx'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { DataPreview } from './data-preview'
import { Modal } from '@/components/common/Modal'
import { Typography } from '@/components/common/typography'
import { ButtonCancel } from '@/components/button/btn-cancle'

interface ExcelData {
  fileName: string
  sheets: {
    [sheetName: string]: any[]
  }
}

export function ExcelUploadDialog({
  open,
  setOpen
}: {
  open: boolean
  setOpen: (open: boolean) => void
}) {
  // const [open, setOpen] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [excelData, setExcelData] = useState<ExcelData | null>(null)
  const [uploadComplete, setUploadComplete] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (
      selectedFile &&
      (selectedFile.type ===
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
        selectedFile.type === 'application/vnd.ms-excel' ||
        selectedFile.name.endsWith('.xlsx') ||
        selectedFile.name.endsWith('.csv') ||
        selectedFile.name.endsWith('.xls'))
    ) {
      setFile(selectedFile)
      setExcelData(null)
      setUploadComplete(false)
      setProgress(0)
    } else {
      alert('Please select a valid Excel file (.xlsx or .xls)')
    }
  }

  const parseExcelFile = (file: File): Promise<ExcelData> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = e => {
        try {
          const data = new Uint8Array(e.target?.result as ArrayBuffer)
          const workbook = XLSX.read(data, { type: 'array' })

          const sheets: { [sheetName: string]: any[] } = {}

          workbook.SheetNames.forEach(sheetName => {
            const worksheet = workbook.Sheets[sheetName]
            const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 })

            // Convert array of arrays to array of objects with proper headers
            if (jsonData.length > 0) {
              const headers = jsonData[0] as string[]
              const rows = jsonData.slice(1) as any[][]

              sheets[sheetName] = rows.map(row => {
                const obj: any = {}
                headers.forEach((header, index) => {
                  obj[header || `Column_${index + 1}`] = row[index] || null
                })
                return obj
              })
            }
          })

          resolve({
            fileName: file.name,
            sheets
          })
        } catch (error) {
          reject(error)
        }
      }
      reader.onerror = () => reject(new Error('Failed to read file'))
      reader.readAsArrayBuffer(file)
    })
  }

  const simulateUpload = async (data: ExcelData) => {
    // Simulate server upload with progress
    const formData = new FormData()
    formData.append('excelData', JSON.stringify(data))

    // Simulate upload progress
    for (let i = 0; i <= 100; i += 10) {
      setProgress(i)
      await new Promise(resolve => setTimeout(resolve, 200))
    }

    // In a real implementation, you would send the data to your server here
    // const response = await fetch('/api/upload-excel', {
    //   method: 'POST',
    //   body: formData
    // })

    return data
  }

  const handleUpload = async () => {
    if (!file) return

    setUploading(true)
    setProgress(0)

    try {
      // Parse Excel file
      const parsedData = await parseExcelFile(file)

      // Simulate server upload
      await simulateUpload(parsedData)

      setExcelData(parsedData)
      setUploadComplete(true)
    } catch (error) {
      console.error('Upload failed:', error)
      alert('Failed to process Excel file')
    } finally {
      setUploading(false)
    }
  }

  const handleReset = () => {
    setFile(null)
    setExcelData(null)
    setUploadComplete(false)
    setProgress(0)
    setUploading(false)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const droppedFile = e.dataTransfer.files[0]
    if (
      droppedFile &&
      (droppedFile.type ===
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
        droppedFile.type === 'application/vnd.ms-excel' ||
        droppedFile.name.endsWith('.xlsx') ||
        droppedFile.name.endsWith('.xls'))
    ) {
      setFile(droppedFile)
      setExcelData(null)
      setUploadComplete(false)
      setProgress(0)
    }
  }

  const downloadTemplate = () => {
    // Create sample data with the required columns
    const templateData = [
      {
        'Staff ID': 'A001',
        'Name': 'John Doe',
        'Domain Name': 'example.com',
        'Operator ID': 'O001',
        Role: 'Admin',
        Section: 'Support',
        Center: 'Main Center',
        Status: 'Active'
      },
      {
        'Staff ID': 'A002',
        'Name': 'Jane Smith',
        'Domain Name': 'example.org',
        'Operator ID': 'O002',
        Role: 'User',
        Section: 'Sales',
        Center: 'Branch Office',
        Status: 'Disable'
      }
    ]

    // Create a new workbook
    const wb = XLSX.utils.book_new()

    // Convert data to worksheet
    const ws = XLSX.utils.json_to_sheet(templateData)

    // Set column widths for better readability
    const colWidths = [
      { wch: 15 }, // username
      { wch: 25 }, // email
      { wch: 15 } // tel
    ]
    ws['!cols'] = colWidths

    // Add the worksheet to workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Users')

    // Generate and download the file
    // XLSX.writeFile(wb, 'user_template.xlsx')
    XLSX.writeFile(wb, 'user_template.csv')
  }

  return (
    <Modal isOpen={open} title={'Import User'} onClose={() => setOpen(false)}>
      <div className='flex gap-4 items-center'>
        <Typography variant='body1'>Upload File</Typography>
        <Button variant='link' size='sm' onClick={downloadTemplate}>
          <Download className='mr-2 h-4 w-4' />
          Download Template
        </Button>
      </div>
      <div className='space-y-6 mt-3'>
        {!uploadComplete && (
          // border-2 border-dashed border-muted-foreground/25 hover:border-muted-foreground/50
          <div
            className='bg-primary/10 hover:bg-primary/15   p-8 text-center  transition-colors'
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            {/* TODO: SET COLOR */}
            <FileSpreadsheet
              className='mx-auto h-12 w-12 text-muted-foreground mb-4'
              color='#7461cf'
            />
            <div className='flex items-center justify-center gap-2'>
              <CloudUpload color='#7461cf' />
              <Typography variant='body1' className='text-primary'>
                Upload File
              </Typography>
            </div>
            <div className='space-y-2 text-center'>
              <Typography variant='caption'>
                Upload a file for your import user.
              </Typography>
              <Typography variant='caption'>
                File Format <span className='text-black'>CSV</span> Please
                download template for upload
              </Typography>

              {/* <p className='text-sm text-muted-foreground'>
                Drag and drop your Excel file here, or click to browse
              </p>
              <p className='text-xs text-muted-foreground'>
                Expected columns: username, email, tel
              </p> */}
              <input
                ref={fileInputRef}
                type='file'
                accept='.xlsx,.xls,.csv'
                // accept='.xlsx,.xls'
                onChange={handleFileSelect}
                className='hidden'
                id='excel-upload'
              />
              {/* <div className='flex gap-2 justify-center'>
                <Button
                  variant='outline'
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                >
                  Browse Files
                </Button>
                <Button variant='ghost' size='sm' onClick={downloadTemplate}>
                  <Download className='mr-1 h-3 w-3' />
                  Get Template
                </Button>
              </div> */}
            </div>
          </div>
        )}

        {file && !uploadComplete && (
          <div className='space-y-4'>
            <div className='flex items-center justify-between p-4 border rounded-lg'>
              <div className='flex items-center space-x-3'>
                {/* @ts-expect-error className is valid for lucide icon */}
                <FileSpreadsheet className='h-8 w-8 text-green-600' />
                <div>
                  <p className='font-medium'>{file.name}</p>
                  <p className='text-sm text-muted-foreground'>
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <Button
                variant='ghost'
                size='sm'
                onClick={handleReset}
                disabled={uploading}
              >
                {/* @ts-expect-error className is valid for lucide icon */}
                <X className='h-4 w-4' />
              </Button>
            </div>

            {uploading && (
              <div className='space-y-2'>
                <div className='flex items-center justify-between'>
                  <span className='text-sm font-medium'>Uploading...</span>
                  <span className='text-sm text-muted-foreground'>
                    {progress}%
                  </span>
                </div>
                <Progress value={progress} className='w-full' />
              </div>
            )}

            {/* <div className='flex justify-end space-x-2'>
              <ButtonCancel
                disabled={uploading}
                onClick={() => {
                  handleReset()
                  setOpen(false)
                }}
              />
              <Button onClick={handleUpload} disabled={uploading}>
                {uploading ? 'Processing...' : 'Upload & Parse'}
              </Button>
            </div> */}
          </div>
        )}
        {/* <div className='flex justify-end space-x-2'>
          <ButtonCancel
            disabled={uploading}
            onClick={() => {
              handleReset()
              setOpen(false)
            }}
          />
          <Button
            onClick={handleUpload}
            disabled={!file || uploading || uploadComplete}
          >
            {uploading ? 'Processing...' : 'Upload & Parse'}
          </Button>
        </div> */}

        {uploadComplete && excelData && (
          <div className='space-y-4'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center space-x-2'>
                {/* @ts-expect-error className is valid for lucide icon */}
                <Check className='h-5 w-5 text-green-600' />
                <span className='font-medium'>Upload Complete</span>
                <Badge variant='secondary'>{excelData.fileName}</Badge>
              </div>
              <Button variant='outline' size='sm' onClick={handleReset}>
                Upload Another
              </Button>
            </div>

            <div className='space-y-4'>
              <h3 className='font-semibold'>Data Preview</h3>
              {Object.entries(excelData.sheets).map(
                ([sheetName, sheetData]) => (
                  <DataPreview
                    key={sheetName}
                    data={sheetData}
                    sheetName={sheetName}
                  />
                )
              )}
              {/* 
              <details className='border rounded-lg'>
                <summary className='p-4 cursor-pointer font-medium hover:bg-muted/50'>
                  View Raw JSON Data
                </summary>
                <ScrollArea className='h-64 w-full border-t'>
                  <div className='p-4'>
                    <pre className='text-sm'>
                      {JSON.stringify(excelData, null, 2)}
                    </pre>
                  </div>
                </ScrollArea>
              </details> */}
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div className='space-y-2'>
                <h4 className='font-medium'>Sheets Found</h4>
                <div className='space-y-1'>
                  {Object.keys(excelData.sheets).map(sheetName => (
                    <Badge key={sheetName} variant='outline'>
                      {sheetName} ({excelData.sheets[sheetName].length} rows)
                    </Badge>
                  ))}
                </div>
              </div>
              <div className='space-y-2'>
                <h4 className='font-medium'>File Info</h4>
                <div className='text-sm text-muted-foreground space-y-1'>
                  <p>File: {excelData.fileName}</p>
                  <p>Total Sheets: {Object.keys(excelData.sheets).length}</p>
                  <p>
                    Total Rows:{' '}
                    {Object.values(excelData.sheets).reduce(
                      (acc, sheet) => acc + sheet.length,
                      0
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className='flex justify-end space-x-2 mt-3'>
        <ButtonCancel
          disabled={uploading}
          onClick={() => {
            handleReset()
            setOpen(false)
          }}
        />
        <Button
          onClick={handleUpload}
          disabled={!file || uploading || uploadComplete}
        >
          {uploading ? 'Processing...' : 'Upload & Parse'}
        </Button>
      </div>
      {/* <div className='flex justify-end gap-3 mt-3'>
        <ButtonCancel onClick={() => {}} />
        <Button>Import </Button>
      </div> */}
    </Modal>
  )
}
