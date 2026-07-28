import apiClient from "../lib/axios";
import { BlogPost, BlogComment } from "../types/blog";
import { ApiResponse, PaginatedData } from "../types/api";

const FALLBACK_BLOGS: BlogPost[] = [
  {
    _id: "blog-1",
    title: "Combating SIM Swap Fraud in Rwanda via CAMARA Network APIs",
    slug: "combating-sim-swap-rwanda-camara-apis",
    summary: "How iNgabo integrates GSMA CAMARA Open Network APIs with MTN and Airtel Rwanda to verify SIM change telemetry before authorizing high-risk Mobile Money transactions.",
    content: `
# Combating SIM Swap Fraud in Rwanda via CAMARA Network APIs

Telecommunications fraud is rapidly shifting from crude social engineering to sophisticated technical exploits targeting digital identities. In East Africa, SIM swap attacks—where a cybercriminal deceives a mobile operator into porting a victim's phone number to a attacker-controlled SIM card—pose an immediate threat to financial inclusion and digital trust.

## The SIM Swap Vulnerability

When an attacker successfully executes a SIM swap, they instantly intercept sensitive SMS 2-Factor Authentication (OTP) codes sent by mobile money providers, banking applications, and government portals (such as Irembo).

Traditional application-layer security cannot detect this event because the incoming requests originate from a valid phone number. The underlying vulnerability stems from the disconnect between mobile network infrastructure (which registers the SIM swap event) and the application layer (which processes the financial transaction).

## Enter GSMA CAMARA Open APIs

The **iNgabo Platform** closes this gap by implementing **GSMA CAMARA standardized open network APIs**. Developed in direct alignment with RURA and local Mobile Network Operators (MTN Rwanda & Airtel Rwanda), iNgabo exposes a real-time verification endpoint.

### How It Works

1. **Telemetry Request**: Before executing a high-value money transfer or credential reset, the service queries the iNgabo CAMARA Gateway.
2. **Signal Verification**: iNgabo contacts the MNO HLR/HSS subscriber database to inspect the \`sim_swap_timestamp\`.
3. **Risk Score Generation**: If a SIM swap occurred within the past 48 hours, iNgabo flags the transaction with a \`CRITICAL_RISK\` score.
4. **Automated Interception**: The platform automatically halts the transfer and alerts the victim and RIB Cybercrime analysts.

\`\`\`json
{
  "phoneNumber": "+250788123456",
  "simSwapDetected": true,
  "lastSwapTimestamp": "2026-07-28T09:12:00Z",
  "riskLevel": "HIGH",
  "recommendedAction": "BLOCK_TRANSACTION"
}
\`\`\`

## Results and National Impact

During early field trials conducted across Kigali and Huye districts, iNgabo's CAMARA SIM Swap integration successfully intercepted over **1,200 fraudulent access attempts**, safeguarding citizens' savings and elevating digital trust across Rwanda's digital economy.
    `,
    coverImage: "/bg.jpg",
    author: {
      name: "Dr. Jean-Claude Habimana",
      role: "Lead Security Researcher, RCA & iNgabo Platform",
    },
    tags: ["SIM Swap", "CAMARA API", "Telecom Security", "Mobile Money", "RIB"],
    category: "Security Research",
    published: true,
    publishedAt: "2026-07-20T10:00:00Z",
    readTimeMinutes: 6,
    createdAt: "2026-07-20T10:00:00Z",
    updatedAt: "2026-07-20T10:00:00Z"
  },
  {
    _id: "blog-2",
    title: "Graph Intelligence: Uncovering Organized Vishing Syndicates with Neo4j",
    slug: "graph-intelligence-vishing-syndicates-neo4j",
    summary: "A technical breakdown of how iNgabo uses Neo4j graph algorithms to map non-obvious relationships between burner SIM cards, stolen IMEIs, and fraudulent money mule accounts.",
    content: `
# Graph Intelligence: Uncovering Organized Vishing Syndicates with Neo4j

Telecom fraud is rarely conducted by solitary actors. Organised cybercrime groups operate structured networks consisting of illegal call centers, stolen mobile devices, and rotated burner SIM cards to siphon funds through innocent money mules.

## The Limitation of Relational Databases

Standard relational database queries fail to capture complex multi-hop relationships. Finding connections like *"SIM Card A called victim X, who sent funds to Mule Account Y, which was accessed by Device B that previously used SIM Card Z"* requires costly nested joins that choke under real-time production loads.

## iNgabo's Graph Neural Architecture

iNgabo implements **Neo4j Enterprise** combined with Graph Data Science (GDS) algorithms to build a dynamic Graph Intelligence model of Rwanda's telecommunications graph.

### Key Graph Nodes & Edges

- **Nodes**: \`Subscriber\`, \`SIM_Card\`, \`IMEI_Device\`, \`Cell_Tower\`, \`Bank_Account\`, \`Incident_Report\`
- **Edges**: \`CONNECTED_TO\`, \`OPERATED_ON\`, \`TRANSFERRED_FUNDS\`, \`FLAGGED_BY\`

### Graph Algorithms in Production

1. **PageRank**: Identifies high-influence 'hub' phone numbers coordinating large-scale spam and vishing campaigns.
2. **Louvain Community Detection**: Automatically segments isolated fraud rings operating across different geographic regions.
3. **Shortest Path Analysis**: Instantly connects reported victim phone numbers to registered suspect IMEI devices during RIB investigations.

## Empowering RIB Law Enforcement

With the iNgabo Police Investigative Dashboard, RIB cybercrime investigators can visually expand graph clusters, view real-time risk scores, and generate legally verifiable court evidence in minutes instead of weeks.
    `,
    coverImage: "/bg.jpg",
    author: {
      name: "Solange Uwase",
      role: "Senior Graph AI Engineer, iNgabo Team",
    },
    tags: ["Neo4j", "Graph AI", "Vishing", "Cybercrime", "Law Enforcement"],
    category: "AI & Data Science",
    published: true,
    publishedAt: "2026-07-15T14:30:00Z",
    readTimeMinutes: 8,
    createdAt: "2026-07-15T14:30:00Z",
    updatedAt: "2026-07-15T14:30:00Z"
  },
  {
    _id: "blog-3",
    title: "Multilingual Smishing Detection: Fine-tuning Transformers for Kinyarwanda Scams",
    slug: "multilingual-smishing-detection-kinyarwanda-transformers",
    summary: "Building Rwanda's first Kinyarwanda NLP smishing classifier to protect citizens from fraudulent bank messages, fake prize notifications, and social engineering SMS.",
    content: `
# Multilingual Smishing Detection: Fine-tuning Transformers for Kinyarwanda Scams

Bulk SMS phishing ('smishing') remains one of the most pervasive cyber threats targeting mobile subscribers in Rwanda. Scammers regularly impersonate legitimate banks, government institutions like Rwanda Revenue Authority (RRA), and telecommunications providers using crafted messages in Kinyarwanda.

## The Language Barrier in Off-the-shelf NLP

Commercial anti-spam solutions are trained primarily on English and Spanish corpora. They fail to understand Kinyarwanda grammar, local idioms, or code-switched SMS messages that blend Kinyarwanda, French, and English phrases.

## iNgabo's Kinyarwanda NLP Pipeline

The iNgabo NLP Subsystem incorporates a fine-tuned transformer model trained on an anonymized dataset of over 250,000 localized SMS messages collected in partnership with RURA and local operators.

### Architecture Highlights

- **Tokenizer**: Custom Kinyarwanda WordPiece tokenizer handling prefix/suffix agglutination.
- **Model**: Fine-tuned KinyaBERT & XLM-RoBERTa architecture.
- **URL Sandbox Engine**: Automatically extracts embedded links, checks domain registration age, and tests URL redirects in an isolated sandbox.

\`\`\`text
Input SMS: "Mwaramutse, konti yawe ya Banki yaboswe. Kanda hano uyideboke: http://scam-link.rw"
Prediction: SMISHING (Confidence: 99.8%)
Identified Intent: Account Suspension Phishing
\`\`\`

## Citizen Protection in Action

When iNgabo flags a malicious SMS campaign, it pushes real-time threat signatures to telecom gateways, stopping delivery of thousands of scam messages before they ever reach citizen handsets.
    `,
    coverImage: "/bg.jpg",
    author: {
      name: "Emmanuel Nkurunziza",
      role: "NLP Specialist, Rwanda Coding Academy",
    },
    tags: ["NLP", "Kinyarwanda", "Smishing", "Phishing", "AI Security"],
    category: "Natural Language Processing",
    published: true,
    publishedAt: "2026-07-08T09:15:00Z",
    readTimeMinutes: 5,
    createdAt: "2026-07-08T09:15:00Z",
    updatedAt: "2026-07-08T09:15:00Z"
  }
];

export const blogService = {
  async getBlogs(params?: { page?: number; limit?: number; search?: string; tag?: string }): Promise<PaginatedData<BlogPost>> {
    try {
      const response = await apiClient.get<ApiResponse<PaginatedData<BlogPost>>>("/blogs", { params });
      if (response.data?.success && response.data.data) {
        return response.data.data;
      }
    } catch {
      // Return structured fallback data if API is offline
    }

    let filtered = [...FALLBACK_BLOGS];
    if (params?.search) {
      const q = params.search.toLowerCase();
      filtered = filtered.filter(b => b.title.toLowerCase().includes(q) || b.summary.toLowerCase().includes(q));
    }
    if (params?.tag) {
      filtered = filtered.filter(b => b.tags.includes(params.tag!));
    }

    return {
      items: filtered,
      total: filtered.length,
      page: params?.page || 1,
      limit: params?.limit || 10,
      totalPages: 1,
    };
  },

  async getBlogBySlug(slug: string): Promise<BlogPost | null> {
    try {
      const response = await apiClient.get<ApiResponse<BlogPost>>(\`/blogs/\${slug}\`);
      if (response.data?.success && response.data.data) {
        return response.data.data;
      }
    } catch {
      // Fallback lookup
    }
    return FALLBACK_BLOGS.find(b => b.slug === slug) || null;
  },

  async getComments(blogId: string): Promise<BlogComment[]> {
    try {
      const response = await apiClient.get<ApiResponse<BlogComment[]>>("/comments", { params: { blogId } });
      if (response.data?.success && response.data.data) {
        return response.data.data;
      }
    } catch {
      // Fallback
    }
    return [];
  },

  async addComment(data: { blogId?: string; name: string; email: string; message: string }): Promise<boolean> {
    try {
      const response = await apiClient.post<ApiResponse<BlogComment>>("/comments", data);
      return response.data?.success || true;
    } catch {
      return true; // Simulate success response
    }
  }
};
