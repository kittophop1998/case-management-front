import { ExcelUploadDialog } from "./excel-upload-dialog"

export default function MainTestExcel() {
    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <div className="max-w-md w-full space-y-8 text-center">
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold">Excel Upload Demo</h1>
                    <p className="text-muted-foreground">Upload and parse Excel files with progress tracking</p>
                    <div className="text-sm text-muted-foreground space-y-1">
                        <p>
                            Required columns: <strong>username</strong>, <strong>email</strong>, <strong>tel</strong>
                        </p>
                        <p>Download the template to get started</p>
                    </div>
                </div>
                <ExcelUploadDialog />
            </div>
        </div>
    )
}
