"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { blogService } from "../../services/blog.service";
import { PageHeader } from "../../components/layout/PageHeader";
import { Card } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { Search, ArrowRight, FileText } from "../../components/ui/icons";
import { formatDate } from "../../lib/utils";

export default function BlogListingPage() {
  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const { data: blogData, isLoading } = useQuery({
    queryKey: ["blogs", search, selectedTag],
    queryFn: () => blogService.getBlogs({ search, tag: selectedTag || undefined }),
  });

  const blogs = blogData?.items || [];
  const tags = ["SIM Swap", "CAMARA API", "Neo4j", "Graph AI", "Kinyarwanda", "NLP", "RIB", "Smishing"];

  return (
    <div>
      <PageHeader
        badge="Technical Publications"
        title="Blog & Security Advisories"
        subtitle="Articles, technical deep-dives, and threat advisories published by the iNgabo Platform Engineering Team."
      />

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Search & Tag Filter Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 rounded-2xl bg-[#F8FAFC] border border-[#E5E7EB]">
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <input
                type="text"
                placeholder="Search articles..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-[#E5E7EB] rounded-xl focus:outline-none focus:border-[#0F3D91]"
              />
              <Search size={18} className="absolute left-3 top-3 text-[#6B7280]" />
            </div>

            {/* Tags list */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setSelectedTag(null)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-full transition-colors ${
                  selectedTag === null ? "bg-[#0F3D91] text-white" : "bg-white text-[#475569] border border-[#E5E7EB] hover:bg-[#F1F5F9]"
                }`}
              >
                All Topics
              </button>
              {tags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-full transition-colors ${
                    selectedTag === tag ? "bg-[#0F3D91] text-white" : "bg-white text-[#475569] border border-[#E5E7EB] hover:bg-[#F1F5F9]"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Articles Grid */}
          {isLoading ? (
            <div className="text-center py-12 text-[#6B7280]">Loading publication catalog...</div>
          ) : blogs.length === 0 ? (
            <div className="text-center py-12 text-[#6B7280]">No matching articles found.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                      <h3 className="text-xl font-bold text-[#111827] group-hover:text-[#0F3D91] transition-colors">
                        {blog.title}
                      </h3>
                    </Link>

                    <p className="text-xs text-[#6B7280] leading-relaxed line-clamp-3">
                      {blog.summary}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {blog.tags.map((t) => (
                        <span key={t} className="text-[10px] bg-[#F1F5F9] text-[#475569] px-2 py-0.5 rounded">
                          #{t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-[#E5E7EB] flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#111827]">
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
          )}

        </div>
      </section>
    </div>
  );
}
