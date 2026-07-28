import apiClient from "../lib/axios";
import { TeamMember } from "../types/member";
import { ApiResponse } from "../types/api";

const FALLBACK_MEMBERS: TeamMember[] = [
  {
    _id: "mem-1",
    name: "Dr. Jean-Claude Habimana",
    role: "Lead Platform Architect & Security Researcher",
    institution: "Rwanda Coding Academy / MINICT",
    bio: "Ph.D. in Cybersecurity & Distributed Systems. Lead architect of the iNgabo platform with over 15 years of experience in telecom signaling security and zero trust architectures.",
    avatar: "/bg.jpg",
    email: "j.habimana@ingabo.org",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    isLeadership: true,
    order: 1
  },
  {
    _id: "mem-2",
    name: "Solange Uwase",
    role: "Senior Graph AI & Machine Learning Engineer",
    institution: "Rwanda Coding Academy",
    bio: "Specializes in Neo4j Graph Neural Networks, behavioral anomaly detection, and real-time fraud risk scoring algorithms.",
    avatar: "/bg.jpg",
    email: "s.uwase@ingabo.org",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    isLeadership: true,
    order: 2
  },
  {
    _id: "mem-3",
    name: "Emmanuel Nkurunziza",
    role: "NLP Research Specialist & Data Engineer",
    institution: "Rwanda Coding Academy",
    bio: "Expert in Kinyarwanda natural language processing, transformer architectures, and bulk threat intelligence stream analytics.",
    avatar: "/bg.jpg",
    email: "e.nkurunziza@ingabo.org",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    isLeadership: false,
    order: 3
  },
  {
    _id: "mem-4",
    name: "Diane Mutesi",
    role: "Telecom Protocols & CAMARA Integration Lead",
    institution: "RURA / iNgabo Core Team",
    bio: "Specialist in 3GPP cellular security standards, SS7/DIAMETER signaling telemetry, and GSMA CAMARA API gateway deployment.",
    avatar: "/bg.jpg",
    email: "d.mutesi@ingabo.org",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    isLeadership: false,
    order: 4
  }
];

export const memberService = {
  async getMembers(): Promise<TeamMember[]> {
    try {
      const response = await apiClient.get<ApiResponse<TeamMember[]>>("/members");
      if (response.data?.success && response.data.data) {
        return response.data.data;
      }
    } catch {
      // Fallback
    }
    return FALLBACK_MEMBERS;
  }
};
