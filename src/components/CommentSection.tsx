'use client'

import React, { useState } from 'react'
import { Button } from './ui/Button'
import { Avatar } from './ui/Avatar'
import type { Comment } from '@/types'
import { formatTimeAgo } from '@/lib/utils'

interface CommentSectionProps {
  postId: number
  comments?: Comment[]
  allowComments?: boolean
  className?: string
}

// Dummy comments for demonstration
const dummyComments: Comment[] = [
  {
    id: 1,
    postId: 1,
    author: {
      name: '田中太郎',
      email: 'tanaka@example.com',
      avatar: ''
    },
    content: 'とても参考になる記事でした！特にTypeScriptの型定義の部分が勉強になりました。',
    createdAt: '2024-01-20T10:30:00Z',
    status: 'approved' as const,
    replies: []
  },
  {
    id: 2,
    postId: 1,
    author: {
      name: '佐藤花子',
      email: 'sato@example.com',
      avatar: ''
    },
    content: 'Next.js 15の新機能について詳しく解説されていて、とても分かりやすかったです。実際のプロジェクトでも試してみたいと思います。',
    createdAt: '2024-01-21T14:15:00Z',
    status: 'approved' as const,
    replies: [
      {
        id: 3,
        postId: 1,
        author: {
          name: '記事作者',
          email: 'author@example.com',
          avatar: ''
        },
        content: 'コメントありがとうございます！ぜひプロジェクトで試してみてください。何か質問があればお気軽にどうぞ。',
        createdAt: '2024-01-21T16:20:00Z',
        status: 'approved' as const,
        parentId: 2,
        replies: []
      }
    ]
  }
]

export function CommentSection({ 
  postId: _, 
  comments = dummyComments, 
  allowComments = true,
  className = "" 
}: CommentSectionProps) {
  const [newComment, setNewComment] = useState('')
  const [authorName, setAuthorName] = useState('')
  const [authorEmail, setAuthorEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [replyTo, setReplyTo] = useState<number | null>(null)
  const [replyContent, setReplyContent] = useState('')

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!newComment.trim() || !authorName.trim() || !authorEmail.trim()) {
      alert('すべてのフィールドを入力してください')
      return
    }

    setIsSubmitting(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Reset form
      setNewComment('')
      setAuthorName('')
      setAuthorEmail('')
      
      alert('コメントを投稿しました！承認後に表示されます。')
    } catch (error) {
      console.error('Failed to submit comment:', error)
      alert('コメントの投稿に失敗しました。')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSubmitReply = async (_parentId: number) => {
    if (!replyContent.trim()) {
      alert('返信内容を入力してください')
      return
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      
      setReplyContent('')
      setReplyTo(null)
      
      alert('返信を投稿しました！')
    } catch (error) {
      console.error('Failed to submit reply:', error)
      alert('返信の投稿に失敗しました。')
    }
  }

  const renderComment = (comment: Comment, isReply = false) => (
    <div 
      key={comment.id} 
      className={`${isReply ? 'ml-12 border-l-2 border-gray-100 pl-6' : ''}`}
    >
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        {/* Comment Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <Avatar
              name={comment.author.name}
              size="sm"
              className="flex-shrink-0"
            />
            <div>
              <div className="font-semibold text-gray-900 text-sm">
                {comment.author.name}
              </div>
              <div className="text-xs text-gray-500">
                {formatTimeAgo(comment.createdAt)}
              </div>
            </div>
          </div>
          
          {/* Actions */}
          <div className="flex items-center gap-2">
            {!isReply && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setReplyTo(replyTo === comment.id ? null : comment.id)}
                className="text-xs"
              >
                返信
              </Button>
            )}
          </div>
        </div>

        {/* Comment Content */}
        <div className="text-gray-700 leading-relaxed mb-4">
          {comment.content}
        </div>

        {/* Reply Form */}
        {replyTo === comment.id && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <textarea
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              placeholder="返信を入力..."
              className="w-full p-3 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
            />
            <div className="flex justify-end gap-2 mt-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setReplyTo(null)
                  setReplyContent('')
                }}
              >
                キャンセル
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => handleSubmitReply(comment.id)}
              >
                返信を投稿
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Render Replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="mt-4 space-y-4">
          {comment.replies.map(reply => renderComment(reply, true))}
        </div>
      )}
    </div>
  )

  return (
    <section className={`space-y-8 ${className}`}>
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <svg
            className="w-6 h-6 text-blue-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
          コメント ({comments.length})
        </h2>
      </div>

      {/* Comment Form */}
      {allowComments && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            コメントを残す
          </h3>
          
          <form onSubmit={handleSubmitComment} className="space-y-4">
            {/* Name and Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="author-name" className="block text-sm font-medium text-gray-700 mb-1">
                  お名前 <span className="text-red-500">*</span>
                </label>
                <input
                  id="author-name"
                  type="text"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label htmlFor="author-email" className="block text-sm font-medium text-gray-700 mb-1">
                  メールアドレス <span className="text-red-500">*</span>
                </label>
                <input
                  id="author-email"
                  type="email"
                  value={authorEmail}
                  onChange={(e) => setAuthorEmail(e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            {/* Comment Content */}
            <div>
              <label htmlFor="comment-content" className="block text-sm font-medium text-gray-700 mb-1">
                コメント <span className="text-red-500">*</span>
              </label>
              <textarea
                id="comment-content"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="コメントを入力してください..."
                className="w-full p-3 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={5}
                required
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <Button
                type="submit"
                variant="primary"
                loading={isSubmitting}
                className="px-6"
              >
                コメントを投稿
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Comments List */}
      <div className="space-y-6">
        {comments.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 text-gray-300">
              <svg
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              まだコメントがありません
            </h3>
            <p className="text-gray-600">
              最初にコメントを投稿してみませんか？
            </p>
          </div>
        ) : (
          comments.map(comment => renderComment(comment))
        )}
      </div>
    </section>
  )
}