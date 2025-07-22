import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function TemplateInfo() {
    return (
        <Card className="mb-6">
            <CardHeader>
                <CardTitle className="text-lg">Template Format</CardTitle>
                <CardDescription>Your Excel file should contain the following columns:</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">username</Badge>
                    <Badge variant="secondary">email</Badge>
                    <Badge variant="secondary">tel</Badge>
                </div>
                <div className="mt-4 text-sm text-muted-foreground">
                    <p>• Download the template to see the expected format</p>
                    <p>• Each row represents one user record</p>
                    <p>• Make sure all required fields are filled</p>
                </div>
            </CardContent>
        </Card>
    )
}
