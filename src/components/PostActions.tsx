'use client'

import React, { useState } from 'react'
import { Button } from './ui/Button'

interface PostActionsProps {
  postId: number
  postTitle: string
  postUrl: string
  initialLikes?: number
  className?: string
}

export function PostActions({ 
  postId: _, 
  postTitle, 
  postUrl, 
  initialLikes = 0,
  className = "" 
}: PostActionsProps) {
  const [likes, setLikes] = useState(initialLikes)
  const [isLiked, setIsLiked] = useState(false)
  const [isLiking, setIsLiking] = useState(false)
  const [showShareMenu, setShowShareMenu] = useState(false)

  const handleLike = async () => {
    if (isLiking) return
    
    setIsLiking(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      
      if (isLiked) {
        setLikes(prev => prev - 1)
        setIsLiked(false)
      } else {
        setLikes(prev => prev + 1)
        setIsLiked(true)
      }
    } catch (error) {
      console.error('Failed to update like:', error)
    } finally {
      setIsLiking(false)
    }
  }

  const shareOptions = [
    {
      name: 'Twitter',
      icon: '🐦',
      action: () => {
        const text = `${postTitle} - `
        const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(postUrl)}`
        window.open(url, '_blank', 'noopener,noreferrer')
      }
    },
    {
      name: 'Facebook',
      icon: '📘',
      action: () => {
        const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`
        window.open(url, '_blank', 'noopener,noreferrer')
      }
    },
    {
      name: 'LINE',
      icon: '💬',
      action: () => {
        const text = `${postTitle}`
        const url = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(postUrl)}&text=${encodeURIComponent(text)}`
        window.open(url, '_blank', 'noopener,noreferrer')
      }
    },
    {
      name: 'コピー',
      icon: '📋',
      action: async () => {
        try {
          await navigator.clipboard.writeText(postUrl)
          // You could add a toast notification here
          alert('URLをコピーしました！')
        } catch (error) {
          console.error('Failed to copy URL:', error)
          // Fallback for older browsers
          const textArea = document.createElement('textarea')
          textArea.value = postUrl
          document.body.appendChild(textArea)
          textArea.select()
          document.execCommand('copy')
          document.body.removeChild(textArea)
          alert('URLをコピーしました！')
        }
        setShowShareMenu(false)
      }
    }
  ]

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {/* Like Button */}
      <div className="flex items-center gap-2">
        <Button
          variant={isLiked ? "primary" : "outline"}
          size="sm"
          onClick={handleLike}
          loading={isLiking}
          className={`
            transition-all duration-300 min-w-[80px]
            ${isLiked ? 'animate-pulse' : ''}
          `}
          leftIcon={
            <span className={`transition-transform duration-200 ${isLiked ? 'scale-110' : ''}`}>
              {isLiked ? '❤️' : '🤍'}
            </span>
          }
        >
          {likes}
        </Button>
      </div>

      {/* Share Button */}
      <div className="relative">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowShareMenu(!showShareMenu)}
          leftIcon={<span>📤</span>}
        >
          シェア
        </Button>

        {/* Share Menu */}
        {showShareMenu && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setShowShareMenu(false)}
              aria-hidden="true"
            />
            
            {/* Menu */}
            <div className="absolute bottom-full left-0 mb-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg z-50">
              <div className="p-2">
                <div className="mb-2 px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  シェアする
                </div>
                
                <div className="space-y-1">
                  {shareOptions.map((option) => (
                    <button
                      key={option.name}
                      onClick={option.action}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      <span className="text-lg flex-shrink-0" role="img" aria-hidden="true">
                        {option.icon}
                      </span>
                      <span className="font-medium text-gray-900">
                        {option.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Bookmark Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => {
          // Add bookmark functionality here
          alert('ブックマーク機能は準備中です')
        }}
        leftIcon={<span>🔖</span>}
        className="text-gray-600 hover:text-gray-900"
      >
        保存
      </Button>
    </div>
  )
}