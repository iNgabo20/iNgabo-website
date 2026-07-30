"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { blogService } from "../../../services/blog.service";
import { PageHeader } from "../../../components/layout/PageHeader";
import { Badge } from "../../../components/ui/Badge";
import { Button } from "../../../components/ui/Button";
import { MessageSquare, CheckCircle } from "../../../components/ui/icons";
import { formatDate } from "../../../lib/utils";

export default function BlogDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [commentName, setCommentName] = useState("");
  const [commentEmail, setCommentEmail] = useState("");
  const [commentMsg, setCommentMsg] = useState("");
  const [commentSubmitted, setCommentSubmitted] = useState(false);

  const { data: blog, isLoading } = useQuery({
    queryKey: ["blog", slug],
    queryFn: () => blogService.getBlogBySlug(slug),
  });

  const { data: comments = [], refetch: refetchComments } = useQuery({
    queryKey: ["comments", blog?._id],
    queryFn: () => blog?._id ? blogService.getComments(blog._id) : Promise.resolve([]),
    enabled: !!blog?._id,
  });

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (commentName && commentEmail && commentMsg) {
      await blogService.addComment({ blogId: blog?._id, name: commentName, email: commentEmail, message: commentMsg });
      setCommentSubmitted(true);
      setCommentName("");
      setCommentEmail("");
      setCommentMsg("");
      refetchComments();
    }
  };

  if (isLoading) {
    return (
      <div className="py-24 text-center text-[#6B7280]">
        Loading article content...
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="py-24 text-center space-y-4">
        <h2 className="text-2xl font-bold text-[#111827]">Article Not Found</h2>
        <p className="text-sm text-[#6B7280]">The requested technical publication does not exist.</p>
        <Link href="/blog">
          <Button variant="primary" size="md">
            Return to Blog Catalog
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        badge={blog.category}
        title={blog.title}
        subtitle={`Published on ${formatDate(blog.publishedAt)} by ${blog.author.name}`}
      />

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Metadata Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB] text-xs">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#0F3D91] text-white flex items-center justify-center font-bold">
                {blog.author.name.charAt(0)}
              </div>
              <div>
                <span className="font-bold text-[#111827] block">{blog.author.name}</span>
                <span className="text-[#6B7280]">{blog.author.role}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {blog.tags.map((t) => (
                <Badge key={t} variant="neutral" size="sm">
                  #{t}
                </Badge>
              ))}
            </div>
          </div>

          {/* Article Content Body */}
          <article className="prose max-w-none text-[#334155] text-sm md:text-base leading-relaxed space-y-6">
            {blog.content.split("\n\n").map((paragraph, i) => {
              if (paragraph.startsWith("# ")) {
                return <h1 key={i} className="text-2xl font-extrabold text-[#111827] pt-4">{paragraph.replace("# ", "")}</h1>;
              }
              if (paragraph.startsWith("## ")) {
                return <h2 key={i} className="text-xl font-bold text-[#111827] pt-3">{paragraph.replace("## ", "")}</h2>;
              }
              if (paragraph.startsWith("### ")) {
                return <h3 key={i} className="text-lg font-semibold text-[#111827] pt-2">{paragraph.replace("### ", "")}</h3>;
              }
              if (paragraph.startsWith("```")) {
                return (
                  <pre key={i} className="p-4 rounded-xl bg-[#102A43] text-white font-mono text-xs overflow-x-auto">
                    <code>{paragraph.replace(/```[a-z]*/g, "").trim()}</code>
                  </pre>
                );
              }
              return <p key={i}>{paragraph}</p>;
            })}
          </article>

          {/* Comments Section */}
          <div className="pt-12 border-t border-[#E5E7EB] space-y-8">
            <h3 className="text-xl font-bold text-[#111827] flex items-center gap-2">
              <MessageSquare size={20} className="text-[#0F3D91]" />
              Discussion & Reader Comments ({comments.length})
            </h3>

            {commentSubmitted && (
              <div className="p-4 bg-[#00A86B]/10 text-[#00A86B] border border-[#00A86B]/20 rounded-xl flex items-center gap-2 text-xs font-semibold">
                <CheckCircle size={18} />
                <span>Your comment has been submitted for moderation!</span>
              </div>
            )}

            {/* Comment Form */}
            <form onSubmit={handleCommentSubmit} className="p-6 rounded-2xl bg-[#F8FAFC] border border-[#E5E7EB] space-y-4">
              <h4 className="text-sm font-bold text-[#111827]">Leave a Comment</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  required
                  placeholder="Your Name *"
                  value={commentName}
                  onChange={(e) => setCommentName(e.target.value)}
                  className="px-3.5 py-2 text-sm bg-white border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#0F3D91]"
                />
                <input
                  type="email"
                  required
                  placeholder="Your Email *"
                  value={commentEmail}
                  onChange={(e) => setCommentEmail(e.target.value)}
                  className="px-3.5 py-2 text-sm bg-white border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#0F3D91]"
                />
              </div>
              <textarea
                required
                rows={3}
                placeholder="Share your thoughts on this security research..."
                value={commentMsg}
                onChange={(e) => setCommentMsg(e.target.value)}
                className="w-full px-3.5 py-2 text-sm bg-white border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#0F3D91]"
              />
              <Button type="submit" variant="primary" size="sm">
                Submit Comment
              </Button>
            </form>
          </div>

        </div>
      </section>
    </div>
  );
}
