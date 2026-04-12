/**
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
  const stats = [
    { label: "🧠 思考(T)", value: 80, color: "#4A90E2" },
    { label: "🔮 直觉(N)", value: 90, color: "#9B59B6" },
    { label: "⚖️ 判断(J)", value: 75, color: "#E67E22" },
    { label: "💛 情感(F)", value: 60, color: "#F1C40F" },
  ];
  const traits = [
    { icon: "🧠", title: "细腻共情", desc: "敏锐感知，温柔处理" },
    { icon: "🔍", title: "好奇心", desc: "喜欢探索 AI 与各种领域的交叉" },
    { icon: "⚡", title: "行动派", desc: "遇事不决，干了再说" },
    { icon: "🌈", title: "开朗温暖", desc: "爱做团队中的粘合剂，乐于协作" },
  ];

  return (
    <CardWrapper onClose={onClose} visible={visible} title="身份标签" color="#E8A0BF">
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

      {/* Stats bars */}
      <div style={{ marginBottom: "16px" }}>
        <div style={{ fontSize: "10px", color: "#8B0000", marginBottom: "8px", textAlign: "center" }}>
          — 性格数值 —
        </div>
        {stats.map(stat => (
          <div key={stat.label} style={{ marginBottom: "8px" }}>
            <div style={{ fontSize: "9px", color: "#333", marginBottom: "4px" }}>{stat.label}</div>
            <div style={{
              width: "100%", height: "12px",
              background: "#ddd",
              border: "2px solid #000",
              position: "relative",
              overflow: "hidden",
            }}>
              <div style={{
                width: `${stat.value}%`,
                height: "100%",
                background: stat.color,
                transition: "width 1s ease",
                imageRendering: "pixelated",
              }} />
              <div style={{
                position: "absolute", right: "4px", top: "0",
                fontSize: "8px", lineHeight: "12px", color: "#000",
              }}>{stat.value}%</div>
            </div>
          </div>
        ))}
      </div>

      {/* Traits */}
      <div style={{ marginBottom: "16px" }}>
        <div style={{ fontSize: "10px", color: "#8B0000", marginBottom: "8px", textAlign: "center" }}>
          — 特质列表 —
        </div>
        {traits.map(t => (
          <div key={t.title} style={{
            display: "flex", alignItems: "flex-start", gap: "8px",
            marginBottom: "6px", padding: "6px",
            background: "#FFF0F5",
            border: "2px solid #000",
          }}>
            <span style={{ fontSize: "14px" }}>{t.icon}</span>
            <div>
              <div style={{ fontSize: "9px", fontWeight: "bold", color: "#8B0000" }}>{t.title}</div>
              <div style={{ fontSize: "8px", color: "#555", marginTop: "2px" }}>{t.desc}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Tags */}
      <div style={{ marginBottom: "16px" }}>
        <div style={{ fontSize: "10px", color: "#8B0000", marginBottom: "8px", textAlign: "center" }}>
          — 身份标签 —
        </div>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "8px",
        }}>
          {[
            "朋友圈一级潜水员",
            "微信运动霸榜专业户",
            "无效化妆非遗继承人",
            "当代赛博AI佃农"
          ].map(tag => (
            <div key={tag} style={{
              background: "#FFB6C1",
              border: "2px solid #000",
              padding: "8px",
              fontSize: "9px",
              color: "#8B0000",
              textAlign: "center",
              fontWeight: "bold",
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
    { id: 2, name: "旅行", emoji: "✈️", desc: "走过 30+ 城市，收集日落与故事", img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663538179270/gGNJUTGsMN9fxyxQUNEaYD/amy_hobby_3_b30e4fff.jpg" },
    { id: 3, name: "摄影", emoji: "📷", desc: "喜欢拍人像与街角光影", img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663538179270/gGNJUTGsMN9fxyxQUNEaYD/amy_hobby_2_a2b1f719.jpg" },
    { id: 4, name: "写作", emoji: "✍️", desc: "曾在校记者团发表多篇报道", img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663538179270/gGNJUTGsMN9fxyxQUNEaYD/amy_hobby_1_250a9429.jpg" },
  ];

  return (
    <CardWrapper onClose={onClose} visible={visible} title="爱好介绍" color="#87CEEB">
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "20px",
        height: "100%",
      }}>
        {hobbies.map(h => (
          <div key={h.id} style={{
            background: "#FFF8F0",
            border: "4px solid #000",
            padding: "16px",
            display: "flex",
            flexDirection: "column",
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
          org: "华南师范大学记者团",
          details: ["负责校园新闻采编工作", "统筹部门采编事务与内容产出"],
        },
        {
          period: "2022.07-2024.06",
          role: "组织委员",
          org: "华南师范大学心理学院本科生第二党支部",
          details: ["主持党组织生活", "统筹三会一课开展以及材料审核等工作"],
        },
        {
          period: "2024.09-至今",
          role: "部级宣传委员",
          org: "华南师范大学心理学院",
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
          details: ["主导下乡数据收集、计划书修改、团队统筹及演讲稿撰写", "助力乡村女性电商再就业"],
        },
        {
          period: "2023.09-2024.03",
          role: "第一负责人",
          org: '"挑战杯" 乡村振兴赛道校金奖',
          details: ["统筹教育+帮扶乡村女性电商就业创业项目全流程", "负责项目实施与比赛答辩汇报"],
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
                    position: "absolute",
                    left: "-17px", top: "4px",
                    width: "8px", height: "8px",
                    background: section.color,
                    border: "2px solid #000",
                  }} />
                  <div style={{
                    background: "#FFF8F0",
                    border: "2px solid #000",
                    padding: "8px",
                    marginLeft: "8px",
                  }}>
                    <div style={{ fontSize: "9px", color: section.color, fontWeight: "bold" }}>
                      {item.period}
                    </div>
                    <div style={{ fontSize: "9px", color: "#8B0000", fontWeight: "bold", marginTop: "2px" }}>
                      {item.role}
                    </div>
                    <div style={{ fontSize: "8px", color: "#555", marginTop: "2px" }}>
                      {item.org}
                    </div>
                    {item.details.map((detail, di) => (
                      <div key={di} style={{ fontSize: "8px", color: "#555", marginTop: "2px", marginLeft: "8px" }}>
                        • {detail}
                      </div>
                    ))}
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
  const degrees = [
    {
      icon: "🎓",
      degree: "心理学硕士",
      school: "华南师范大学",
      period: "2024.09-至今",
      color: "#9B59B6",
    },
    {
      icon: "📚",
      degree: "心理学学士",
      school: "华南师范大学",
      period: "2020.09-2024.06",
      color: "#3498DB",
    },
  ];

  return (
    <CardWrapper onClose={onClose} visible={visible} title="教育背景" color="#FFD700">
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {degrees.map((deg, i) => (
          <div
            key={i}
            style={{
              animation: `fadeInUp 0.4s ease ${i * 0.2}s both`,
              display: "flex",
              gap: "12px",
              alignItems: "center",
            }}
          >
            {/* Pixel badge */}
            <div style={{
              width: "60px", height: "60px",
              background: deg.color,
              border: "4px solid #000",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "24px",
              boxShadow: "4px 4px 0 #000",
              flexShrink: 0,
            }}>
              {deg.icon}
            </div>

            {/* Info */}
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: "10px", color: "#8B0000", fontWeight: "bold" }}>
                {deg.degree}
              </div>
              <div style={{ fontSize: "9px", color: "#555", marginTop: "2px" }}>
                {deg.school}
              </div>
              <div style={{ fontSize: "8px", color: "#999", marginTop: "2px" }}>
                {deg.period}
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
  const plans = [
    { icon: "🎯", title: "深化心理学研究", desc: "专注于心理健康干预与积极心理学应用" },
    { icon: "🚀", title: "探索 AI + 心理学", desc: "研发心理健康 AI 工具，让更多人受益" },
    { icon: "🌍", title: "推动心理公益", desc: "建立心理咨询志愿服务体系" },
    { icon: "✨", title: "个人成长", desc: "成为温暖而有力量的心理工作者" },
  ];

  const progressPercent = 35;

  return (
    <CardWrapper onClose={onClose} visible={visible} title="未来计划" color="#FF69B4">
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {/* Progress bar */}
        <div style={{ marginBottom: "8px" }}>
          <div style={{ fontSize: "10px", color: "#8B0000", marginBottom: "4px", textAlign: "center" }}>
            🌟 2025 年度目标进度 🌟
          </div>
          <div style={{
            width: "100%", height: "16px",
            background: "#ddd",
            border: "3px solid #000",
            position: "relative",
            overflow: "hidden",
          }}>
            <div style={{
              width: `${progressPercent}%`,
              height: "100%",
              background: "linear-gradient(90deg, #FF69B4, #FFB6C1)",
              transition: "width 1s ease",
              imageRendering: "pixelated",
            }} />
            <div style={{
              position: "absolute", right: "4px", top: "0",
              fontSize: "9px", lineHeight: "16px", color: "#000", fontWeight: "bold",
            }}>{progressPercent}%</div>
          </div>
        </div>

        {/* Plans */}
        {plans.map((plan, i) => (
          <div
            key={i}
            style={{
              animation: `fadeInUp 0.4s ease ${i * 0.1}s both`,
              background: "#FFF0F5",
              border: "2px solid #000",
              padding: "10px",
              display: "flex",
              gap: "10px",
              alignItems: "flex-start",
            }}
          >
            <span style={{ fontSize: "16px", flexShrink: 0 }}>{plan.icon}</span>
            <div>
              <div style={{ fontSize: "9px", color: "#8B0000", fontWeight: "bold" }}>
                {plan.title}
              </div>
              <div style={{ fontSize: "8px", color: "#555", marginTop: "2px" }}>
                {plan.desc}
              </div>
            </div>
          </div>
        ))}
      </div>
    </CardWrapper>
  );
}

// ========== CardWrapper 组件 ==========
interface CardWrapperProps {
  children: React.ReactNode;
  onClose: () => void;
  visible: boolean;
  title: string;
  color: string;
}

function CardWrapper({ children, onClose, visible, title, color }: CardWrapperProps) {
  if (!visible) return null;

  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "90%",
        height: "85%",
        background: "#FFF8F0",
        border: "6px solid #000",
        boxShadow: "8px 8px 0 #000",
        zIndex: 1000,
        display: "flex",
        flexDirection: "column",
        animation: "cardScaleIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
      }}
    >
      {/* Header */}
      <div
        style={{
          background: color,
          border: `4px solid #000`,
          borderBottom: "none",
          padding: "12px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ fontSize: "12px", color: "#000", fontWeight: "bold", fontFamily: "'Press Start 2P', monospace" }}>
          {title}
        </div>
        <button
          onClick={onClose}
          style={{
            background: "#FF4444",
            border: "3px solid #000",
            color: "#fff",
            fontSize: "14px",
            cursor: "pointer",
            padding: "4px 8px",
            fontWeight: "bold",
            boxShadow: "2px 2px 0 #000",
            transition: "all 0.2s",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = "scale(1.1)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          ✕
        </button>
      </div>

      {/* Content */}
      <div
        style={{
          flex: 1,
          overflow: "auto",
          padding: "16px",
          background: "#FFF8F0",
        }}
      >
        {children}
      </div>

      <style>{`
        @keyframes cardScaleIn {
          from {
            transform: translate(-50%, -50%) scaleX(0);
            opacity: 0;
          }
          to {
            transform: translate(-50%, -50%) scaleX(1);
            opacity: 1;
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
      `}</style>
    </div>
  );
}
