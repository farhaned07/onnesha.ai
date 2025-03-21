"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import DashboardHeader from "@/components/dashboard/dashboard-header"
import DashboardSidebar from "@/components/dashboard/dashboard-sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  FileText,
  ImageIcon,
  File,
  Upload,
  Search,
  MoreHorizontal,
  Download,
  Trash2,
  Share2,
  Eye,
  Plus,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { useToast } from "@/hooks/use-toast"

export default function DocumentsPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [language, setLanguage] = useState<"en" | "bn">("en")
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [isUploading, setIsUploading] = useState(false)

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "bn" : "en")
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const handleFileUpload = () => {
    setIsUploading(true)

    // Simulate file upload
    setTimeout(() => {
      setIsUploading(false)
      toast({
        title: language === "en" ? "File uploaded" : "ফাইল আপলোড করা হয়েছে",
        description: language === "en" ? "Your file has been uploaded successfully" : "আপনার ফাইল সফলভাবে আপলোড করা হয়েছে",
      })
    }, 1500)
  }

  const handleFileDelete = (id: string) => {
    toast({
      title: language === "en" ? "File deleted" : "ফাইল মুছে ফেলা হয়েছে",
      description: language === "en" ? "The file has been deleted successfully" : "ফাইলটি সফলভাবে মুছে ফেলা হয়েছে",
    })
  }

  const translations = {
    en: {
      documents: "Documents",
      all: "All Files",
      images: "Images",
      pdfs: "PDFs",
      others: "Others",
      search: "Search files...",
      uploadFile: "Upload File",
      recentUploads: "Recent Uploads",
      name: "Name",
      type: "Type",
      size: "Size",
      uploadedOn: "Uploaded On",
      actions: "Actions",
      view: "View",
      download: "Download",
      share: "Share",
      delete: "Delete",
      noFiles: "No files found",
      uploadNew: "Upload a new file to get started",
      dragDrop: "Drag and drop files here, or click to select files",
      browse: "Browse Files",
    },
    bn: {
      documents: "ডকুমেন্টস",
      all: "সব ফাইল",
      images: "ছবি",
      pdfs: "পিডিএফ",
      others: "অন্যান্য",
      search: "ফাইল খুঁজুন...",
      uploadFile: "ফাইল আপলোড করুন",
      recentUploads: "সাম্প্রতিক আপলোড",
      name: "নাম",
      type: "ধরন",
      size: "আকার",
      uploadedOn: "আপলোড করা হয়েছে",
      actions: "অ্যাকশন",
      view: "দেখুন",
      download: "ডাউনলোড করুন",
      share: "শেয়ার করুন",
      delete: "মুছুন",
      noFiles: "কোন ফাইল পাওয়া যায়নি",
      uploadNew: "শুরু করতে একটি নতুন ফাইল আপলোড করুন",
      dragDrop: "এখানে ফাইল টেনে আনুন, অথবা ফাইল নির্বাচন করতে ক্লিক করুন",
      browse: "ফাইল ব্রাউজ করুন",
    },
  }

  const t = translations[language]

  // Mock data for files
  const files = [
    {
      id: "file1",
      name: "Project Proposal.pdf",
      type: "pdf",
      size: "2.4 MB",
      uploadedOn: "2023-10-15",
    },
    {
      id: "file2",
      name: "Meeting Notes.docx",
      type: "document",
      size: "1.2 MB",
      uploadedOn: "2023-10-14",
    },
    {
      id: "file3",
      name: "Dashboard Screenshot.png",
      type: "image",
      size: "3.5 MB",
      uploadedOn: "2023-10-13",
    },
    {
      id: "file4",
      name: "Financial Report.xlsx",
      type: "spreadsheet",
      size: "4.1 MB",
      uploadedOn: "2023-10-12",
    },
    {
      id: "file5",
      name: "Product Brochure.pdf",
      type: "pdf",
      size: "5.7 MB",
      uploadedOn: "2023-10-11",
    },
  ]

  // Filter files based on search query
  const filteredFiles = files.filter((file) => file.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const getFileIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return <FileText className="h-5 w-5 text-red-500" />
      case "image":
        return <ImageIcon className="h-5 w-5 text-blue-500" />
      case "document":
        return <FileText className="h-5 w-5 text-blue-500" />
      case "spreadsheet":
        return <FileText className="h-5 w-5 text-green-500" />
      default:
        return <File className="h-5 w-5 text-gray-500" />
    }
  }

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-900 overflow-hidden">
      {/* Sidebar */}
      {isSidebarOpen && <DashboardSidebar language={language} activePage="documents" />}

      {/* Main content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <DashboardHeader
          language={language}
          toggleLanguage={toggleLanguage}
          toggleSidebar={toggleSidebar}
          isSidebarOpen={isSidebarOpen}
        />

        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <div>
                <h1 className="text-2xl font-bold">{t.documents}</h1>
                <p className="text-muted-foreground">
                  {language === "en"
                    ? "Manage your uploaded files and documents"
                    : "আপনার আপলোড করা ফাইল এবং ডকুমেন্ট পরিচালনা করুন"}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder={t.search}
                    className="pl-9 w-full md:w-[250px]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button onClick={handleFileUpload} disabled={isUploading}>
                  {isUploading ? (
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      <span>{language === "en" ? "Uploading..." : "আপলোড হচ্ছে..."}</span>
                    </div>
                  ) : (
                    <>
                      <Upload size={16} className="mr-2" />
                      {t.uploadFile}
                    </>
                  )}
                </Button>
              </div>
            </div>

            <Tabs defaultValue="all" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="all" className="text-sm">
                  <File size={16} className="mr-2" />
                  {t.all}
                </TabsTrigger>
                <TabsTrigger value="images" className="text-sm">
                  <ImageIcon size={16} className="mr-2" />
                  {t.images}
                </TabsTrigger>
                <TabsTrigger value="pdfs" className="text-sm">
                  <FileText size={16} className="mr-2" />
                  {t.pdfs}
                </TabsTrigger>
                <TabsTrigger value="others" className="text-sm">
                  <File size={16} className="mr-2" />
                  {t.others}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="all">
                <Card>
                  <CardHeader>
                    <CardTitle>{t.recentUploads}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {filteredFiles.length > 0 ? (
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left py-3 px-4 font-medium">{t.name}</th>
                              <th className="text-left py-3 px-4 font-medium">{t.type}</th>
                              <th className="text-left py-3 px-4 font-medium">{t.size}</th>
                              <th className="text-left py-3 px-4 font-medium">{t.uploadedOn}</th>
                              <th className="text-right py-3 px-4 font-medium">{t.actions}</th>
                            </tr>
                          </thead>
                          <tbody>
                            {filteredFiles.map((file) => (
                              <motion.tr
                                key={file.id}
                                className="border-b hover:bg-slate-100 dark:hover:bg-slate-800/50"
                                whileHover={{ backgroundColor: "rgba(0, 0, 0, 0.02)" }}
                              >
                                <td className="py-3 px-4">
                                  <div className="flex items-center gap-2">
                                    {getFileIcon(file.type)}
                                    <span>{file.name}</span>
                                  </div>
                                </td>
                                <td className="py-3 px-4">
                                  <Badge variant="outline" className="capitalize">
                                    {file.type}
                                  </Badge>
                                </td>
                                <td className="py-3 px-4">{file.size}</td>
                                <td className="py-3 px-4">{file.uploadedOn}</td>
                                <td className="py-3 px-4 text-right">
                                  <div className="flex items-center justify-end gap-2">
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                      <Eye size={16} />
                                      <span className="sr-only">{t.view}</span>
                                    </Button>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                      <Download size={16} />
                                      <span className="sr-only">{t.download}</span>
                                    </Button>
                                    <DropdownMenu>
                                      <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                          <MoreHorizontal size={16} />
                                          <span className="sr-only">More options</span>
                                        </Button>
                                      </DropdownMenuTrigger>
                                      <DropdownMenuContent align="end">
                                        <DropdownMenuItem>
                                          <Share2 size={14} className="mr-2" />
                                          <span>{t.share}</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => handleFileDelete(file.id)}>
                                          <Trash2 size={14} className="mr-2" />
                                          <span>{t.delete}</span>
                                        </DropdownMenuItem>
                                      </DropdownMenuContent>
                                    </DropdownMenu>
                                  </div>
                                </td>
                              </motion.tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-12">
                        <FileText className="h-12 w-12 text-muted-foreground mb-4 opacity-20" />
                        <h3 className="text-lg font-medium mb-1">{t.noFiles}</h3>
                        <p className="text-muted-foreground mb-4">{t.uploadNew}</p>
                        <Button onClick={handleFileUpload}>
                          <Plus size={16} className="mr-2" />
                          {t.uploadFile}
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="images">
                <Card>
                  <CardHeader>
                    <CardTitle>{t.images}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {filteredFiles
                        .filter((file) => file.type === "image")
                        .map((file) => (
                          <Card key={file.id} className="overflow-hidden">
                            <div className="aspect-video bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                              <ImageIcon className="h-10 w-10 text-muted-foreground opacity-20" />
                            </div>
                            <CardContent className="p-3">
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="font-medium truncate">{file.name}</p>
                                  <p className="text-xs text-muted-foreground">{file.size}</p>
                                </div>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                      <MoreHorizontal size={16} />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem>
                                      <Eye size={14} className="mr-2" />
                                      <span>{t.view}</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      <Download size={14} className="mr-2" />
                                      <span>{t.download}</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      <Share2 size={14} className="mr-2" />
                                      <span>{t.share}</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleFileDelete(file.id)}>
                                      <Trash2 size={14} className="mr-2" />
                                      <span>{t.delete}</span>
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                    </div>

                    {filteredFiles.filter((file) => file.type === "image").length === 0 && (
                      <div className="flex flex-col items-center justify-center py-12">
                        <ImageIcon className="h-12 w-12 text-muted-foreground mb-4 opacity-20" />
                        <h3 className="text-lg font-medium mb-1">{t.noFiles}</h3>
                        <p className="text-muted-foreground mb-4">{t.uploadNew}</p>
                        <Button onClick={handleFileUpload}>
                          <Plus size={16} className="mr-2" />
                          {t.uploadFile}
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="pdfs">
                <Card>
                  <CardHeader>
                    <CardTitle>{t.pdfs}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {filteredFiles
                        .filter((file) => file.type === "pdf")
                        .map((file) => (
                          <Card key={file.id}>
                            <CardContent className="p-4">
                              <div className="flex items-start gap-3">
                                <div className="p-2 bg-red-50 dark:bg-red-900/20 rounded-lg">
                                  <FileText className="h-8 w-8 text-red-500" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="font-medium truncate">{file.name}</p>
                                  <p className="text-xs text-muted-foreground">{file.size}</p>
                                  <div className="flex items-center gap-2 mt-2">
                                    <Button variant="outline" size="sm" className="h-7 text-xs">
                                      <Eye size={12} className="mr-1" />
                                      {t.view}
                                    </Button>
                                    <Button variant="outline" size="sm" className="h-7 text-xs">
                                      <Download size={12} className="mr-1" />
                                      {t.download}
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                    </div>

                    {filteredFiles.filter((file) => file.type === "pdf").length === 0 && (
                      <div className="flex flex-col items-center justify-center py-12">
                        <FileText className="h-12 w-12 text-muted-foreground mb-4 opacity-20" />
                        <h3 className="text-lg font-medium mb-1">{t.noFiles}</h3>
                        <p className="text-muted-foreground mb-4">{t.uploadNew}</p>
                        <Button onClick={handleFileUpload}>
                          <Plus size={16} className="mr-2" />
                          {t.uploadFile}
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="others">
                <Card>
                  <CardHeader>
                    <CardTitle>{t.others}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {filteredFiles
                        .filter((file) => file.type !== "pdf" && file.type !== "image")
                        .map((file) => (
                          <Card key={file.id}>
                            <CardContent className="p-4">
                              <div className="flex items-start gap-3">
                                <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                  {getFileIcon(file.type)}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="font-medium truncate">{file.name}</p>
                                  <p className="text-xs text-muted-foreground">{file.size}</p>
                                  <div className="flex items-center gap-2 mt-2">
                                    <Button variant="outline" size="sm" className="h-7 text-xs">
                                      <Download size={12} className="mr-1" />
                                      {t.download}
                                    </Button>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="h-7 text-xs text-red-600 dark:text-red-400"
                                      onClick={() => handleFileDelete(file.id)}
                                    >
                                      <Trash2 size={12} className="mr-1" />
                                      {t.delete}
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                    </div>

                    {filteredFiles.filter((file) => file.type !== "pdf" && file.type !== "image").length === 0 && (
                      <div className="flex flex-col items-center justify-center py-12">
                        <File className="h-12 w-12 text-muted-foreground mb-4 opacity-20" />
                        <h3 className="text-lg font-medium mb-1">{t.noFiles}</h3>
                        <p className="text-muted-foreground mb-4">{t.uploadNew}</p>
                        <Button onClick={handleFileUpload}>
                          <Plus size={16} className="mr-2" />
                          {t.uploadFile}
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}

