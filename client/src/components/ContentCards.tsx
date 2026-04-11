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
    <CardWrapper onClose={onClose} visible={visible} title="ENTJ-A 小小温柔指挥官" color="#E8A0BF">
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

      {/* Quote box */}
      <div style={{
        background: "#1a0a2e",
        border: "4px solid #FFD700",
        padding: "12px",
        marginBottom: "12px",
        position: "relative",
      }}>
        <div style={{
          position: "absolute", top: "-8px", left: "12px",
          background: "#FFD700",
          padding: "2px 8px",
          fontSize: "8px", color: "#000",
        }}>ENTJ 说</div>
        <div style={{ fontSize: "9px", color: "#FFD700", lineHeight: "1.8", textAlign: "center" }}>
          "ENTJ 的温柔，是为你铺好路，<br/>再退后一步让你走。"
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
    { id: 1, name: "舞蹈", emoji: "💃", desc: "Jazz / K-pop，用身体表达情绪", img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663538179270/gGNJUTGsMN9fxyxQUNEaYD/amy_hobby_1_250a9429.jpg" },
    { id: 2, name: "旅行", emoji: "✈️", desc: "走过 30+ 城市，收集日落与故事", img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663538179270/gGNJUTGsMN9fxyxQUNEaYD/amy_hobby_2_a2b1f719.jpg" },
    { id: 3, name: "摄影", emoji: "📷", desc: "喜欢拍人像与街角光影", img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663538179270/gGNJUTGsMN9fxyxQUNEaYD/amy_hobby_3_b30e4fff.jpg" },
    { id: 4, name: "写作", emoji: "✍️", desc: "曾在校记者团发表多篇报道", img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663538179270/gGNJUTGsMN9fxyxQUNEaYD/amy_hobby_4_078ea4f5.jpg" },
  ];

  return (
    <CardWrapper onClose={onClose} visible={visible} title="爱好介绍" color="#87CEEB">
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "12px",
      }}>
        {hobbies.map(h => (
          <div key={h.id} style={{
            background: "#FFF8F0",
            border: "3px solid #000",
            padding: "10px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
          }}>
            <div style={{ fontSize: "16px" }}>{h.emoji}</div>
            <div style={{ fontSize: "10px", color: "#8B0000", fontWeight: "bold" }}>{h.name}</div>
            <div style={{
              width: "120px", height: "120px",
              border: "4px solid #000",
              overflow: "hidden",
              cursor: "pointer",
              transition: "transform 0.2s",
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
            <div style={{ fontSize: "8px", color: "#555", textAlign: "center", lineHeight: "1.6" }}>
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
          period: "2025.06-至今",
          role: "实习心理测评师",
          org: "中南大学湘雅二医院",
          details: ["独立负责39位患者追踪测评", "AI处理5万+数据", "SSCI论文在投"],
        },
        {
          period: "2025.03-2025.06",
          role: "实习猎头（AI财务方向）",
          org: "广州cgl",
          details: ["Mapping 200+企业", "推进终面", "10份人才画像"],
        },
        {
          period: "2024.09-2025.03",
          role: "兼职心理咨询师",
          org: "华南理工大学电气学院",
          details: ["主要负责项目统筹、数据分析与答辩汇报"],
        },
        {
          period: "2024.01-2025.03",
          role: "兼职心理老师",
          org: "华南师范大学附属中学",
          details: ["主要负责项目统筹、数据分析与答辩汇报"],
        },
      ],
    },
    {
      title: "校园经历",
      color: "#2ECC71",
      items: [
        {
          period: "2024.09-至今",
          role: "宣传委员",
          org: "华南师范大学心理学院",
          details: ["主要负责项目统筹、数据分析与答辩汇报"],
        },
        {
          period: "2022.07-2024.06",
          role: "组织委员",
          org: "华师心理学院本科生第二党支部",
          details: ["主要负责项目统筹、数据分析与答辩汇报"],
        },
        {
          period: "2020.09-2022.09",
          role: "采编部部长",
          org: "华师记者团",
          details: ["主要负责项目统筹、数据分析与答辩汇报"],
        },
      ],
    },
    {
      title: "项目经历",
      color: "#FFD700",
      items: [
        {
          period: "2023.09-2024.03",
          role: "第一负责人",
          org: '"挑战杯"乡村振兴赛道金奖',
          details: ["主要负责项目统筹、数据分析与答辩汇报"],
        },
        {
          period: "2023.02-2023.09",
          role: "第二负责人",
          org: '"互联网+"红旅赛道全国金奖',
          details: ["主要负责项目统筹、数据分析与答辩汇报"],
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
                  }}>
                    <div style={{ fontSize: "8px", color: "#888", marginBottom: "4px" }}>{item.period}</div>
                    <div style={{ fontSize: "9px", color: "#8B0000", fontWeight: "bold", marginBottom: "2px" }}>
                      {item.role}
                    </div>
                    <div style={{ fontSize: "8px", color: "#4A90E2", marginBottom: "4px" }}>{item.org}</div>
                    {item.details.map((d, di) => (
                      <div key={di} style={{ fontSize: "8px", color: "#555", lineHeight: "1.6" }}>
                        • {d}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </CardWrapper>
  );
}

// ========== 卡片4：教育背景 ==========
export function EducationCard({ onClose, visible }: CardProps) {
  const degrees = [
    {
      level: "硕士",
      school: "华南师范大学",
      dept: "心理学院",
      period: "2024-至今",
      color: "#9B59B6",
      icon: "🎓",
    },
    {
      level: "本科",
      school: "华南师范大学",
      dept: "心理学",
      period: "2020-2024",
      color: "#3498DB",
      icon: "📚",
    },
  ];
  const courses = ["心理评估", "认知神经科学", "统计与测量", "机器学习基础（自修）"];
  const awards = [
    "校级及研究生高等级奖学金（5次+）",
    "优秀研究生骨干",
    "校优秀共青团员（3次+）",
  ];

  return (
    <CardWrapper onClose={onClose} visible={visible} title="教育背景" color="#9B59B6">
      {/* Degrees */}
      <div style={{ marginBottom: "16px" }}>
        {degrees.map(d => (
          <div key={d.level} style={{
            display: "flex", alignItems: "center", gap: "12px",
            padding: "12px",
            background: "#FFF8F0",
            border: "3px solid #000",
            marginBottom: "10px",
            boxShadow: "4px 4px 0 #000",
          }}>
            <div style={{
              width: "48px", height: "48px",
              background: d.color,
              border: "3px solid #000",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "24px",
              flexShrink: 0,
            }}>{d.icon}</div>
            <div>
              <div style={{ fontSize: "10px", color: d.color, fontWeight: "bold" }}>{d.level}</div>
              <div style={{ fontSize: "9px", color: "#333", marginTop: "4px" }}>{d.school}</div>
              <div style={{ fontSize: "8px", color: "#555" }}>{d.dept}</div>
              <div style={{ fontSize: "8px", color: "#888", marginTop: "2px" }}>{d.period}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Courses */}
      <div style={{ marginBottom: "16px" }}>
        <div style={{ fontSize: "10px", color: "#8B0000", marginBottom: "8px" }}>📖 主修课程</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
          {courses.map(c => (
            <div key={c} style={{
              background: "#4A90E2",
              color: "#fff",
              padding: "4px 8px",
              fontSize: "8px",
              border: "2px solid #000",
              boxShadow: "2px 2px 0 #000",
            }}>{c}</div>
          ))}
        </div>
      </div>

      {/* Awards */}
      <div>
        <div style={{ fontSize: "10px", color: "#8B0000", marginBottom: "8px" }}>🏆 荣誉奖项</div>
        {awards.map(a => (
          <div key={a} style={{
            display: "flex", alignItems: "center", gap: "8px",
            marginBottom: "6px", fontSize: "8px", color: "#333",
          }}>
            <span style={{ color: "#FFD700", fontSize: "12px" }}>★</span>
            {a}
          </div>
        ))}
      </div>
    </CardWrapper>
  );
}

// ========== 卡片5：未来计划 ==========
export function FuturePlanCard({ onClose, visible }: CardProps) {
  const plans = [
    {
      period: "短期（1年内）",
      color: "#2ECC71",
      icon: "🌱",
      desc: "了解人力资源全模块配置，深入业务与一线，成为优秀的 HR",
    },
    {
      period: "中期（2-3年）",
      color: "#4A90E2",
      icon: "🚀",
      desc: "深耕人力资源某一领域，成为心理学+AI+招聘的复合型HR人才",
    },
    {
      period: "长期（5年+）",
      color: "#FFD700",
      icon: "🌟",
      desc: "多年磨一剑，成为人力资源管理某方面的专家",
    },
  ];

  const progress = 35;
  const totalStars = 10;
  const filledStars = Math.floor(progress / 10);
  const halfStar = (progress % 10) >= 5;

  return (
    <CardWrapper onClose={onClose} visible={visible} title="未来计划" color="#FFD700">
      {/* Plans */}
      <div style={{ marginBottom: "20px" }}>
        {plans.map((p, i) => (
          <div key={p.period} style={{
            display: "flex", gap: "12px",
            marginBottom: "14px",
            padding: "10px",
            background: "#FFF8F0",
            border: "3px solid #000",
            boxShadow: "3px 3px 0 #000",
            animation: `fadeInLeft 0.4s ease ${i * 0.15}s both`,
          }}>
            <div style={{
              width: "40px", height: "40px",
              background: p.color,
              border: "2px solid #000",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "20px",
              flexShrink: 0,
            }}>{p.icon}</div>
            <div>
              <div style={{ fontSize: "9px", color: p.color, fontWeight: "bold", marginBottom: "4px" }}>
                {p.period}
              </div>
              <div style={{ fontSize: "8px", color: "#333", lineHeight: "1.6" }}>{p.desc}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Dream progress */}
      <div style={{
        background: "#1a0a2e",
        border: "4px solid #FFD700",
        padding: "12px",
      }}>
        <div style={{ fontSize: "9px", color: "#FFD700", marginBottom: "8px", textAlign: "center" }}>
          ✨ 梦想进度 {progress}% ✨
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: "4px", marginBottom: "8px" }}>
          {Array.from({ length: totalStars }).map((_, i) => {
            if (i < filledStars) return <span key={i} style={{ fontSize: "16px" }}>⭐</span>;
            if (i === filledStars && halfStar) return <span key={i} style={{ fontSize: "16px", opacity: 0.6 }}>⭐</span>;
            return <span key={i} style={{ fontSize: "16px", opacity: 0.2 }}>☆</span>;
          })}
        </div>
        <div style={{
          width: "100%", height: "12px",
          background: "#333",
          border: "2px solid #FFD700",
          position: "relative",
          overflow: "hidden",
        }}>
          <div style={{
            width: `${progress}%`,
            height: "100%",
            background: "linear-gradient(90deg, #FFD700, #FF8C00)",
            transition: "width 1.5s ease",
          }} />
        </div>
        <div style={{ fontSize: "8px", color: "#888", textAlign: "center", marginTop: "6px" }}>
          Keep going! 🌟
        </div>
      </div>

      <style>{`
        @keyframes fadeInLeft {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </CardWrapper>
  );
}

// ========== 通用卡片包装器 ==========
interface CardWrapperProps {
  children: React.ReactNode;
  onClose: () => void;
  visible: boolean;
  title: string;
  color: string;
}

function CardWrapper({ children, onClose, visible, title, color }: CardWrapperProps) {
  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: visible ? "translate(-50%, -50%) scaleX(1) scaleY(1)" : "translate(-50%, -50%) scaleX(0) scaleY(0)",
        width: "360px",
        maxHeight: "70vh",
        background: "#FFF8F0",
        border: "4px solid #000",
        boxShadow: "8px 8px 0 #000",
        zIndex: 100,
        transition: "transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div style={{
        background: color,
        border: "0 0 4px 0",
        borderBottom: "4px solid #000",
        padding: "10px 12px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexShrink: 0,
      }}>
        <div style={{ fontSize: "10px", color: "#000", fontWeight: "bold" }}>{title}</div>
        <button
          onClick={onClose}
          style={{
            background: "#FF4444",
            border: "2px solid #000",
            color: "#fff",
            width: "24px", height: "24px",
            fontSize: "10px",
            cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "'Press Start 2P', monospace",
            boxShadow: "2px 2px 0 #000",
          }}
        >
          X
        </button>
      </div>

      {/* Content */}
      <div style={{
        padding: "16px",
        overflowY: "auto",
        flex: 1,
      }}>
        {children}
      </div>
    </div>
  );
}
