'use client'

import { useState, useRef } from 'react'
import { Upload, X, FileText, CheckCircle, Loader2, AlertCircle } from 'lucide-react'
import { uploadDataset, IDatasetMetadata } from '../lib/api'

interface CSVUploadProps {
  onUpload?: (file: File) => void
  onUploadComplete?: (metadata: IDatasetMetadata) => void
  isDarkTheme: boolean
}

export default function CSVUpload({ onUpload, onUploadComplete, isDarkTheme }: CSVUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [metadata, setMetadata] = useState<IDatasetMetadata | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const files = e.dataTransfer.files
    if (files && files[0]) {
      handleFile(files[0])
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files[0]) {
      handleFile(files[0])
    }
  }

  const handleFile = async (file: File) => {
    if (!(file.type === 'text/csv' || file.name.endsWith('.csv'))) {
      setUploadError('Please upload a valid CSV file')
      return
    }

    setUploadedFile(file)
    setUploadError(null)
    setIsUploading(true)
    if (onUpload) onUpload(file)

    try {
      const response = await uploadDataset(file)
      setMetadata(response.data)
      setIsUploading(false)
      if (onUploadComplete) onUploadComplete(response.data)
    } catch (err) {
      setIsUploading(false)
      setUploadError((err as Error).message)
      setUploadedFile(null)
      setMetadata(null)
    }
  }

  const removeFile = () => {
    setUploadedFile(null)
    setMetadata(null)
    setUploadError(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className={`backdrop-blur-2xl ${isDarkTheme ? 'bg-[#171717]/90' : 'bg-white/90'} rounded-2xl border ${isDarkTheme ? 'border-white/20' : 'border-gray-300'} shadow-2xl p-8`}>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className={`text-2xl font-bold ${isDarkTheme ? 'text-white' : 'text-gray-900'} mb-2`}>Upload CSV File</h3>
            <p className={`${isDarkTheme ? 'text-gray-400' : 'text-gray-600'} text-lg`}>Import your data for analysis and visualization</p>
          </div>
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className={`px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isUploading ? 'Uploading...' : 'Select File'}
          </button>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept=".csv"
          onChange={handleFileSelect}
          className="hidden"
        />

        {/* Error message */}
        {uploadError && (
          <div className={`mb-4 p-4 rounded-xl border flex items-start gap-3 ${isDarkTheme ? 'bg-red-900/20 border-red-500/30 text-red-300' : 'bg-red-50 border-red-300 text-red-700'}`}>
            <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium">Upload failed</p>
              <p className="text-xs mt-1">{uploadError}</p>
            </div>
          </div>
        )}

        {/* Uploading state */}
        {isUploading && (
          <div className={`p-6 rounded-xl border ${isDarkTheme ? 'bg-blue-500/10 border-blue-400/30' : 'bg-blue-50 border-blue-300'} shadow-lg`}>
            <div className="flex items-center gap-4">
              <Loader2 className={`w-8 h-8 animate-spin ${isDarkTheme ? 'text-blue-400' : 'text-blue-600'}`} />
              <div>
                <p className={`font-semibold ${isDarkTheme ? 'text-white' : 'text-gray-900'} text-lg`}>
                  {uploadedFile?.name}
                </p>
                <p className={`${isDarkTheme ? 'text-gray-400' : 'text-gray-600'} text-sm`}>
                  Uploading and processing CSV file...
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Success state */}
        {!isUploading && metadata && uploadedFile ? (
          <div className={`p-6 rounded-xl border ${isDarkTheme ? 'bg-green-500/20 border-green-400/30' : 'bg-green-50 border-green-300'} shadow-lg`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mr-4">
                  <CheckCircle className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <p className={`font-semibold ${isDarkTheme ? 'text-white' : 'text-gray-900'} text-lg`}>{metadata.originalName}</p>
                  <p className={`${isDarkTheme ? 'text-gray-400' : 'text-gray-600'} text-sm`}>
                    {metadata.rowCount} rows • {metadata.columns.length} columns • CSV file
                  </p>
                  <p className={`${isDarkTheme ? 'text-gray-500' : 'text-gray-500'} text-xs mt-1`}>
                    Columns: {metadata.columns.map(c => c.name).join(', ')}
                  </p>
                </div>
              </div>
              <button
                onClick={removeFile}
                className={`p-2 rounded-lg ${isDarkTheme ? 'hover:bg-white/10' : 'hover:bg-gray-200'} transition-all duration-200`}
              >
                <X className={`w-5 h-5 ${isDarkTheme ? 'text-gray-400' : 'text-gray-600'}`} />
              </button>
            </div>
          </div>
        ) : !isUploading && (
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 ${
              isDragging
                ? isDarkTheme
                  ? 'border-blue-400 bg-blue-500/10'
                  : 'border-blue-600 bg-blue-50'
                : isDarkTheme
              ? 'border-white/30 hover:border-white/40'
              : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <div className={`w-16 h-16 mx-auto mb-6 ${isDarkTheme ? 'bg-blue-500/20' : 'bg-blue-100'} rounded-xl flex items-center justify-center`}>
              <Upload className={`w-8 h-8 ${isDarkTheme ? 'text-blue-400' : 'text-blue-600'}`} />
            </div>
            <p className={`text-xl font-semibold ${isDarkTheme ? 'text-white' : 'text-gray-900'} mb-3`}>
              Drag and drop your CSV file here
            </p>
            <p className={`${isDarkTheme ? 'text-gray-400' : 'text-gray-600'} text-lg mb-6`}>
              or click the button above to browse
            </p>
            <div className={`inline-flex items-center px-4 py-2 ${isDarkTheme ? 'bg-[#171717]/60' : 'bg-gray-100'} rounded-lg border ${isDarkTheme ? 'border-white/20' : 'border-gray-300'}`}>
              <FileText className="w-5 h-5 mr-2 text-blue-400" />
              <span className={`${isDarkTheme ? 'text-gray-300' : 'text-gray-700'} text-sm font-medium`}>
                Supported format: CSV files only
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
