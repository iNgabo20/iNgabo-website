"use client";

import React from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { blogService } from "../../services/blog.service";
import { SectionHeader } from "../../components/ui/SectionHeader";
import { Card } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { ArrowRight, FileText } from "../../components/ui/icons";
import { formatDate } from "../../lib/utils";

export const BlogPreviewSection: React.FC = () => {
  const { data: blogData } = useQuery({
    queryKey: ["latest-blogs"],
    queryFn: () => blogService.getBlogs({ limit: 3 }),
  });

  const blogs = blogData?.items || [];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Latest Publications & Research"
          title="Insights & Technical Publications"
          description="Read official technical papers, threat advisories, and security research published by the iNgabo Platform Engineering Team & Rwanda Coding Academy."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {blogs.map((blog) => (
            <Card key={blog._id} className="flex flex-col justify-between hover:border-[#0F3D91]">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Badge variant="primary" size="sm">
                    {blog.category}
                  </Badge>
                  <span className="text-xs text-[#6B7280]">
                    {formatDate(blog.publishedAt)}
                  </span>
                </div>

                <Link href={`/blog/${blog.slug}`} className="block group">
                  <h3 className="text-lg font-bold text-[#111827] group-hover:text-[#0F3D91] transition-colors line-clamp-2">
                    {blog.title}
                  </h3>
                </Link>

                <p className="text-xs text-[#6B7280] leading-relaxed line-clamp-3">
                  {blog.summary}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[#E5E7EB] flex items-center justify-between">
                <span className="text-xs font-medium text-[#111827]">
                  {blog.author.name}
                </span>
                <Link href={`/blog/${blog.slug}`}>
                  <Button variant="ghost" size="sm" rightIcon={<ArrowRight size={16} />}>
                    Read Article
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link href="/blog">
            <Button variant="outline" size="lg" leftIcon={<FileText size={18} />}>
              View All Technical Articles & Advisories
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
