/*
 * ContentCards Component
 * Design: 超级马里奥复古街机风 - 5个内容卡片
 * - 横向画卷式展开动画
 * - 像素风格进度条、时间轴、徽章
 */

import { useRef, useState } from "react";

interface CardProps {
  onClose: () => void;
  visible: boolean;
}

// ========== 卡片1：性格介绍 ==========
export function PersonalityCard({ onClose, visible }: CardProps) {
  const tags = [
    "朋友圈一级潜水员",
    "微信运动霸榜专业户",
    "无效化妆非遗继承人",
    "当代赛博AI佃农",
  ];

  return (
    <CardWrapper onClose={onClose} visible={visible} title="性格介绍" color="#E8A0BF">
      {/* Pixel avatar */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "16px" }}>
        <div style={{
          width: "64px", height: "64px",
          background: "#FFDAB9",
          border: "4px solid #000",
          boxShadow: "4px 4px 0 #000",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "28px",
          position: "relative",
        }}>
          👑
          <div style={{ position: "absolute", bottom: "-2px", fontSize: "20px" }}>🤖</div>
        </div>
      </div>

      {/* Tag labels */}
      <div style={{ marginBottom: "16px" }}>
        <div style={{ fontSize: "10px", color: "#8B0000", marginBottom: "8px", textAlign: "center" }}>
          — 身份标签 —
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", justifyContent: "center" }}>
          {tags.map((tag, idx) => (
            <div key={idx} style={{
              background: "#1a0a2e",
              border: "2px solid #FFD700",
              color: "#FFD700",
              padding: "6px 12px",
              fontSize: "8px",
              fontWeight: "bold",
              fontFamily: "'Press Start 2P', monospace",
              whiteSpace: "nowrap",
              boxShadow: "2px 2px 0 #000",
            }}>
              {tag}
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={{ textAlign: "center", fontSize: "9px", color: "#8B0000" }}>
        🌟 我像一颗像素星星，总想点亮周围的世界。 🌟
      </div>
    </CardWrapper>
  );
}

// ========== 卡片2：爱好介绍 ==========
export function HobbiesCard({ onClose, visible }: CardProps) {
  const hobbies = [
    { id: 1, name: "舞蹈", emoji: "💃", desc: "Jazz / K-pop，用身体表达情绪", img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663538179270/gGNJUTGsMN9fxyxQUNEaYD/amy_hobby_4_078ea4f5.jpg" },
    { id: 2, name: "旅行", emoji: "✈️", desc: "走过 30+ 城市，收藏日常与故事", img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663538179270/gGNJUTGsMN9fxyxQUNEaYD/amy_hobby_2_5e7d8c5c.jpg" },
    { id: 3, name: "摄影", emoji: "📷", desc: "喜欢用人像与街景摄影", img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663538179270/gGNJUTGsMN9fxyxQUNEaYD/amy_hobby_3_3a7d9b2e.jpg" },
    { id: 4, name: "写作", emoji: "✍️", desc: "曾在记者团与宣传部记录故事", img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663538179270/gGNJUTGsMN9fxyxQUNEaYD/amy_hobby_1_c8f4e9a1.jpg" },
  ];

  return (
    <CardWrapper onClose={onClose} visible={visible} title="爱好介绍" color="#FF6B9D">
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        {hobbies.map(h => (
          <div key={h.id} style={{
            display: "flex", flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px",
            boxShadow: "4px 4px 0 #000",
          }}>
            <div style={{ fontSize: "24px" }}>{h.emoji}</div>
            <div style={{ fontSize: "12px", color: "#8B0000", fontWeight: "bold", fontFamily: "'Press Start 2P', monospace" }}>{h.name}</div>
            <div style={{
              width: "140px", height: "140px",
              border: "4px solid #000",
              overflow: "hidden",
              cursor: "pointer",
              transition: "transform 0.2s",
              boxShadow: "3px 3px 0 #000",
            }}
              onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
            >
              <img
                src={h.img}
                alt={h.name}
                style={{
                  width: "100%", height: "100%",
                  objectFit: "cover",
                  imageRendering: "pixelated",
                }}
              />
            </div>
            <div style={{ fontSize: "10px", color: "#555", textAlign: "center", lineHeight: "1.6" }}>
              {h.desc}
            </div>
          </div>
        ))}
      </div>
    </CardWrapper>
  );
}

// ========== 卡片3：过往经历 ==========
export function ExperienceCard({ onClose, visible }: CardProps) {
  const sections = [
    {
      title: "实习经历",
      color: "#FF4444",
      items: [
        {
          period: "2024.11-2025.09",
          role: "兼职心理咨询师",
          org: "华南理工大学电气学院",
          details: ["为学院大一及研一新生提供专业心理咨询服务", "助力心理健康发展与情绪疏导"],
        },
        {
          period: "2025.02-2025.09",
          role: "心理校外导师",
          org: "华南师范大学附属中学",
          details: ["主要负责高三1-7班考前心理疏导", "心理团辅活动安排"],
        },
      ],
    },
    {
      title: "校园经历",
      color: "#2ECC71",
      items: [
        {
          period: "2020.09-2022.09",
          role: "采编组员及采编部长",
          org: "华南师范大学记者团采编部",
          details: ["负责校园新闻采编工作", "统筹部门采编事务与内容产出"],
        },
        {
          period: "2022.07-2024.06",
          role: "组织委员",
          org: "华师心理学院本科生第二党支部",
          details: ["主持党组织生活", "统筹三会一课开展以及材料审核等工作"],
        },
        {
          period: "2024.09-至今",
          role: "部级宣传委员",
          org: "华南师范大学心理学院2024级研究生",
          details: ["负责学院公众号运营", "讲座活动宣传"],
        },
      ],
    },
    {
      title: "项目经历",
      color: "#FFD700",
      items: [
        {
          period: "2023.02-2023.09",
          role: "第二负责人",
          org: '第八届"互联网+"红旅赛道金奖',
          details: ["主导下乡数据收集、计划书修改", "团队统筹及演讲稿撰写", "助力乡村女性电商再就业"],
        },
        {
          period: "2023.09-2024.03",
          role: "第一负责人",
          org: '"挑战杯"乡村振兴赛道校金奖',
          details: ["统筹'教育+帮扶'乡村女性电商就业创业项目全流程", "负责项目实施与比赛答辩汇报"],
        },
      ],
    },
  ];

  return (
    <CardWrapper onClose={onClose} visible={visible} title="过往经历" color="#2ECC71">
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {sections.map((section, si) => (
          <div key={section.title}>
            <div style={{
              fontSize: "10px",
              color: section.color,
              marginBottom: "10px",
              padding: "4px 8px",
              background: "#1a0a2e",
              border: `2px solid ${section.color}`,
              display: "inline-block",
            }}>
              ▶ {section.title}
            </div>
            <div style={{ position: "relative", paddingLeft: "20px" }}>
              {/* Timeline line */}
              <div style={{
                position: "absolute",
                left: "6px", top: "0", bottom: "0",
                width: "2px",
                background: section.color,
              }} />
              {section.items.map((item, ii) => (
                <div
                  key={ii}
                  style={{
                    marginBottom: "12px",
                    animation: `fadeInUp 0.4s ease ${(si * section.items.length + ii) * 0.1}s both`,
                    position: "relative",
                  }}
                >
                  {/* Dot */}
                  <div style={{
                    position: "absolute", left: "-8px", top: "4px",
                    width: "8px", height: "8px",
                    background: section.color,
                    border: "2px solid #000",
                    borderRadius: "50%",
                  }} />

                  {/* Content */}
                  <div style={{ paddingLeft: "8px" }}>
                    <div style={{ fontSize: "9px", color: section.color, fontWeight: "bold" }}>
                      {item.period}
                    </div>
                    <div style={{ fontSize: "10px", color: "#333", fontWeight: "bold", marginTop: "2px" }}>
                      {item.role} @ {item.org}
                    </div>
                    <div style={{ fontSize: "8px", color: "#666", marginTop: "4px", lineHeight: "1.4" }}>
                      {item.details.map((d, di) => (
                        <div key={di}>• {d}</div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </CardWrapper>
  );
}

// ========== 卡片4：教育背景 ==========
export function EducationCard({ onClose, visible }: CardProps) {
  const education = [
    {
      degree: "硕士",
      major: "心理学",
      school: "华南师范大学",
      period: "2024-2026",
      badge: "🎓",
    },
    {
      degree: "学士",
      major: "心理学",
      school: "华南师范大学",
      period: "2020-2024",
      badge: "📚",
    },
  ];

  return (
    <CardWrapper onClose={onClose} visible={visible} title="教育背景" color="#4A90E2">
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {education.map((edu, idx) => (
          <div key={idx} style={{
            display: "flex", alignItems: "center", gap: "16px",
            padding: "12px",
            background: "#E8F4F8",
            border: "3px solid #4A90E2",
            position: "relative",
            animation: `slideIn 0.4s ease ${idx * 0.2}s both`,
          }}>
            <div style={{
              fontSize: "32px",
              position: "relative",
            }}>
              {edu.badge}
              <div style={{
                position: "absolute", bottom: "-4px", right: "-4px",
                fontSize: "16px",
              }}>⭐</div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: "10px", color: "#4A90E2", fontWeight: "bold" }}>
                {edu.degree} - {edu.major}
              </div>
              <div style={{ fontSize: "9px", color: "#333", marginTop: "4px" }}>
                {edu.school}
              </div>
              <div style={{ fontSize: "8px", color: "#666", marginTop: "2px" }}>
                {edu.period}
              </div>
            </div>
          </div>
        ))}
      </div>
    </CardWrapper>
  );
}

// ========== 卡片5：未来计划 ==========
export function FutureCard({ onClose, visible }: CardProps) {
  const goals = [
    { icon: "🎯", title: "心理健康推广", desc: "推动心理健康教育普及" },
    { icon: "🚀", title: "AI 应用探索", desc: "探索 AI 在心理学中的应用" },
    { icon: "🌍", title: "社会贡献", desc: "帮助更多人实现心理成长" },
    { icon: "📖", title: "学术研究", desc: "发表高质量心理学研究论文" },
  ];

  return (
    <CardWrapper onClose={onClose} visible={visible} title="未来计划" color="#F39C12">
      <div style={{ marginBottom: "16px" }}>
        <div style={{ fontSize: "10px", color: "#8B0000", marginBottom: "8px", textAlign: "center" }}>
          — 完成度 35% —
        </div>
        <div style={{
          width: "100%", height: "16px",
          background: "#ddd",
          border: "3px solid #000",
          position: "relative",
          overflow: "hidden",
          boxShadow: "4px 4px 0 #000",
        }}>
          <div style={{
            width: "35%",
            height: "100%",
            background: "linear-gradient(90deg, #FFD700, #FFA500)",
            transition: "width 1s ease",
          }} />
          <div style={{
            position: "absolute", right: "4px", top: "0",
            fontSize: "10px", lineHeight: "16px", color: "#000", fontWeight: "bold",
          }}>35%</div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
        {goals.map((goal, idx) => (
          <div key={idx} style={{
            padding: "12px",
            background: "#FFF8DC",
            border: "2px solid #F39C12",
            textAlign: "center",
            animation: `popIn 0.3s ease ${idx * 0.1}s both`,
          }}>
            <div style={{ fontSize: "20px", marginBottom: "4px" }}>{goal.icon}</div>
            <div style={{ fontSize: "9px", color: "#8B0000", fontWeight: "bold" }}>
              {goal.title}
            </div>
            <div style={{ fontSize: "8px", color: "#666", marginTop: "4px" }}>
              {goal.desc}
            </div>
          </div>
        ))}
      </div>
    </CardWrapper>
  );
}

// ========== CardWrapper 基础卡片容器 ==========
interface CardWrapperProps {
  onClose: () => void;
  visible: boolean;
  title: string;
  color: string;
  children: React.ReactNode;
}

function CardWrapper({ onClose, visible, title, color, children }: CardWrapperProps) {
  return (
    <div style={{
      display: visible ? "flex" : "none",
      position: "absolute",
      top: "0", left: "0", right: "0", bottom: "0",
      background: "#FFF0F5",
      border: "6px solid #000",
      padding: "16px",
      overflow: "auto",
      zIndex: 1000,
      flexDirection: "column",
      animation: visible ? "scaleXIn 0.3s ease forwards" : "scaleXOut 0.3s ease forwards",
    }}>
      {/* Header */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "16px",
        paddingBottom: "12px",
        borderBottom: `3px solid ${color}`,
      }}>
        <h2 style={{
          fontSize: "14px",
          color: color,
          fontWeight: "bold",
          fontFamily: "'Press Start 2P', monospace",
          margin: "0",
        }}>
          {title}
        </h2>
        <button
          onClick={onClose}
          style={{
            background: color,
            border: "3px solid #000",
            color: "#FFF",
            fontSize: "16px",
            fontWeight: "bold",
            width: "32px",
            height: "32px",
            cursor: "pointer",
            boxShadow: "2px 2px 0 #000",
            transition: "all 0.2s",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = "scale(1.1)";
            e.currentTarget.style.boxShadow = "3px 3px 0 #000";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "2px 2px 0 #000";
          }}
        >
          ✕
        </button>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflow: "auto" }}>
        {children}
      </div>

      <style>{`
        @keyframes scaleXIn {
          from {
            transform: scaleX(0);
            opacity: 0;
          }
          to {
            transform: scaleX(1);
            opacity: 1;
          }
        }
        @keyframes scaleXOut {
          from {
            transform: scaleX(1);
            opacity: 1;
          }
          to {
            transform: scaleX(0);
            opacity: 0;
          }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes popIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}
