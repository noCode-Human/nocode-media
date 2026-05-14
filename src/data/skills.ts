import { htmlTemplateEngineExamples } from './htmlTemplateEngineExamples';

export interface SkillExample {
  title: string;
  image?: string;
  description: string;
  html?: string;
  fileName?: string;
}

export interface Skill {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  featured: boolean;
  tags: string[];
  markdown: string;
  htmlPreview: string;
  examples: SkillExample[];
  stats: {
    uses: number;
    rating: number;
    created: string;
  };
}

export const skills: Skill[] = [
  {
    id: "3d-portraits",
    title: "3D Portrait Generator",
    description: "Generate photorealistic 3D portraits from text descriptions with customizable lighting, expressions, and environments.",
    category: "3D",
    image: "/skills/3d-portraits.jpg",
    featured: true,
    tags: ["3D", "AI", "Portrait", "WebGL"],
    stats: { uses: 12540, rating: 4.9, created: "2024-03-15" },
    markdown: `## 3D Portrait Generator

Generate photorealistic 3D portraits using AI-powered text-to-3D technology.

### Features
- Text-to-3D generation
- Customizable lighting setups
- Expression control
- Environment mapping
- PBR material support

### Usage
\`\`\`python
from buildradar import Portrait3D

generator = Portrait3D()
portrait = generator.create(
    prompt="cyberpunk character with neon accents",
    style="realistic",
    lighting="studio"
)
portrait.export("output.glb")
\`\`\`

### Parameters
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| prompt | string | "" | Text description |
| style | string | "realistic" | Art style |
| lighting | string | "studio" | Lighting setup |
| resolution | int | 1024 | Output resolution |

### Output Formats
- GLB (Web optimized)
- OBJ + MTL
- FBX
- USDZ (Apple AR)`,
    htmlPreview: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>3D Portrait Preview</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            background: #0a0a0a; 
            display: flex; 
            justify-content: center; 
            align-items: center; 
            min-height: 100vh; 
            font-family: 'Inter', sans-serif;
        }
        .portrait-container {
            width: 400px;
            height: 500px;
            background: #111;
            border-radius: 20px;
            overflow: hidden;
            position: relative;
            border: 1px solid #ff2a2a33;
        }
        .portrait-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        .overlay {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            padding: 30px;
            background: linear-gradient(transparent, rgba(0,0,0,0.9));
        }
        .title { color: #fff; font-size: 20px; font-weight: 600; }
        .meta { color: #ff2a2a; font-size: 12px; margin-top: 8px; font-family: 'Space Mono', monospace; }
        .controls {
            position: absolute;
            top: 20px;
            right: 20px;
            display: flex;
            gap: 8px;
        }
        .control-btn {
            width: 36px;
            height: 36px;
            border-radius: 10px;
            background: rgba(255,255,255,0.1);
            border: 1px solid rgba(255,255,255,0.1);
            color: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            font-size: 16px;
            transition: all 0.2s;
        }
        .control-btn:hover { background: rgba(255,42,42,0.2); border-color: #ff2a2a; }
    </style>
</head>
<body>
    <div class="portrait-container">
        <img src="/skills/3d-portraits.jpg" class="portrait-image" alt="3D Portrait">
        <div class="controls">
            <button class="control-btn">&#8635;</button>
            <button class="control-btn">&#9776;</button>
            <button class="control-btn">&#9998;</button>
        </div>
        <div class="overlay">
            <div class="title">Cyberpunk Portrait v2.4</div>
            <div class="meta">3D // AI GENERATED // PBR</div>
        </div>
    </div>
</body>
</html>`,
    examples: [
      { title: "Neon Android", image: "/skills/examples/3d-portraits-gallery.jpg", description: "Glowing android portraits with customizable neon colors" },
      { title: "Studio Portrait", image: "/skills/3d-portraits.jpg", description: "Professional studio lighting setup" },
    ]
  },
  {
    id: "webgl-shaders",
    title: "WebGL Shader Lab",
    description: "Create stunning real-time shader effects with a visual node-based editor. Export to vanilla WebGL or Three.js.",
    category: "WebGL",
    image: "/skills/webgl-shaders.jpg",
    featured: true,
    tags: ["WebGL", "GLSL", "Shaders", "Real-time"],
    stats: { uses: 8930, rating: 4.8, created: "2024-01-20" },
    markdown: `## WebGL Shader Lab

Real-time shader creation with a visual node editor.

### Features
- Visual node-based editor
- Real-time preview
- GLSL export
- Three.js integration
- Performance profiler

### Shader Example
\`\`\`glsl
// Fragment shader - Plasma effect
uniform float u_time;
uniform vec2 u_resolution;

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution;
    float t = u_time * 0.5;
    
    float r = sin(uv.x * 10.0 + t) * 0.5 + 0.5;
    float g = sin(uv.y * 10.0 + t * 1.2) * 0.5 + 0.5;
    float b = sin((uv.x + uv.y) * 5.0 + t * 0.8) * 0.5 + 0.5;
    
    gl_FragColor = vec4(r, g, b, 1.0);
}
\`\`\`

### Uniforms
| Uniform | Type | Description |
|---------|------|-------------|
| u_time | float | Elapsed time |
| u_resolution | vec2 | Canvas size |
| u_mouse | vec2 | Mouse position |

### Export Options
- Vanilla WebGL
- Three.js ShaderMaterial
- React Three Fiber`,
    htmlPreview: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>WebGL Shader Preview</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            background: #050505; 
            display: flex; 
            flex-direction: column;
            justify-content: center; 
            align-items: center; 
            min-height: 100vh;
            font-family: 'Space Mono', monospace;
        }
        .shader-canvas {
            width: 500px;
            height: 350px;
            background: #0a0a0a;
            border-radius: 12px;
            border: 1px solid #ff2a2a33;
            position: relative;
            overflow: hidden;
        }
        .shader-canvas::before {
            content: '';
            position: absolute;
            inset: 0;
            background: linear-gradient(135deg, 
                rgba(255,42,42,0.1) 0%, 
                transparent 50%, 
                rgba(255,42,42,0.05) 100%);
            animation: shaderFlow 4s ease-in-out infinite;
        }
        @keyframes shaderFlow {
            0%, 100% { transform: translate(0, 0) rotate(0deg); opacity: 0.3; }
            50% { transform: translate(-20px, -20px) rotate(2deg); opacity: 0.6; }
        }
        .controls-bar {
            width: 500px;
            margin-top: 12px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 12px 16px;
            background: #111;
            border-radius: 8px;
            border: 1px solid #222;
        }
        .control-group { display: flex; align-items: center; gap: 8px; }
        .label { color: #666; font-size: 10px; text-transform: uppercase; }
        .value { color: #ff2a2a; font-size: 11px; }
        .btn {
            padding: 6px 14px;
            background: #1a1a1a;
            border: 1px solid #333;
            color: #fff;
            border-radius: 6px;
            font-size: 11px;
            cursor: pointer;
            font-family: 'Space Mono', monospace;
        }
        .btn:hover { border-color: #ff2a2a; }
    </style>
</head>
<body>
    <div class="shader-canvas"></div>
    <div class="controls-bar">
        <div class="control-group">
            <span class="label">FPS</span>
            <span class="value">60.0</span>
        </div>
        <div class="control-group">
            <span class="label">TRIS</span>
            <span class="value">12,420</span>
        </div>
        <button class="btn">EXPORT GLSL</button>
        <button class="btn" style="border-color:#ff2a2a;">COMPILE</button>
    </div>
</body>
</html>`,
    examples: [
      { title: "Shader Collection", image: "/skills/examples/webgl-gallery.jpg", description: "Various WebGL shader effects including plasma, particles, and waves" },
      { title: "Flowing Ribbons", image: "/skills/webgl-shaders.jpg", description: "Real-time ribbon animation with post-processing" },
    ]
  },
  {
    id: "dashboard-ui",
    title: "Dashboard UI Kit",
    description: "Production-ready dashboard components with dark mode, charts, tables, and real-time data widgets.",
    category: "UI",
    image: "/skills/dashboard-ui.jpg",
    featured: false,
    tags: ["UI", "Dashboard", "Charts", "React"],
    stats: { uses: 22100, rating: 4.9, created: "2024-02-10" },
    markdown: `## Dashboard UI Kit

Production-ready dashboard components with real-time data support.

### Components
- Analytics cards
- Data tables
- Chart widgets
- Sidebar navigation
- Top bar with search
- Notification center

### Quick Start
\`\`\`tsx
import { Dashboard, MetricCard, LineChart } from '@buildradar/dashboard';

function App() {
  return (
    <Dashboard theme="dark">
      <MetricCard
        title="Total Users"
        value="1.5M"
        change="+12%"
        trend="up"
      />
      <LineChart data={analytics} />
    </Dashboard>
  );
}
\`\`\`

### Available Charts
- Line Chart
- Bar Chart
- Pie/Donut Chart
- Area Chart
- Scatter Plot
- Heatmap

### Theming
\`\`\`tsx
// Custom theme
const theme = {
  colors: {
    primary: '#ff2a2a',
    background: '#050505',
    surface: '#0a0a0a',
    text: '#ffffff',
    muted: '#6b6b6b'
  }
};
\`\`\``,    htmlPreview: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard UI Preview</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            background: #0a0a0a; 
            display: flex; 
            justify-content: center; 
            align-items: center; 
            min-height: 100vh;
            font-family: 'Inter', sans-serif;
        }
        .dashboard {
            width: 600px;
            background: #111;
            border-radius: 16px;
            overflow: hidden;
            border: 1px solid #222;
        }
        .header {
            padding: 20px 24px;
            border-bottom: 1px solid #222;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .title { color: #fff; font-size: 18px; font-weight: 600; }
        .badge {
            padding: 4px 12px;
            background: rgba(255,42,42,0.1);
            border: 1px solid rgba(255,42,42,0.3);
            color: #ff2a2a;
            border-radius: 20px;
            font-size: 11px;
            font-family: 'Space Mono', monospace;
        }
        .metrics {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 16px;
            padding: 24px;
        }
        .metric {
            padding: 16px;
            background: #1a1a1a;
            border-radius: 12px;
            border: 1px solid #222;
        }
        .metric-label { color: #666; font-size: 11px; text-transform: uppercase; margin-bottom: 8px; }
        .metric-value { color: #fff; font-size: 24px; font-weight: 700; }
        .metric-change { color: #00ff9d; font-size: 12px; margin-top: 4px; }
        .chart-area {
            padding: 0 24px 24px;
            height: 150px;
            background: linear-gradient(180deg, transparent 0%, rgba(255,42,42,0.03) 100%);
            position: relative;
        }
        .chart-line {
            position: absolute;
            bottom: 24px;
            left: 24px;
            right: 24px;
            height: 80px;
            background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 500 80'%3E%3Cpath d='M0,60 Q50,20 100,40 T200,30 T300,50 T400,20 T500,35' stroke='%23ff2a2a' fill='none' stroke-width='2'/%3E%3C/svg%3E") no-repeat center;
            background-size: contain;
            opacity: 0.6;
        }
    </style>
</head>
<body>
    <div class="dashboard">
        <div class="header">
            <div class="title">Analytics Overview</div>
            <div class="badge">LIVE</div>
        </div>
        <div class="metrics">
            <div class="metric">
                <div class="metric-label">Total Users</div>
                <div class="metric-value">1.5M</div>
                <div class="metric-change">+12% this month</div>
            </div>
            <div class="metric">
                <div class="metric-label">Revenue</div>
                <div class="metric-value">$84K</div>
                <div class="metric-change">+8.3% this month</div>
            </div>
            <div class="metric">
                <div class="metric-label">Sessions</div>
                <div class="metric-value">42.5K</div>
                <div class="metric-change">+23% this month</div>
            </div>
        </div>
        <div class="chart-area">
            <div class="chart-line"></div>
        </div>
    </div>
</body>
</html>`,
    examples: [
      { title: "Dashboard Collection", image: "/skills/examples/dashboard-gallery.jpg", description: "Various dashboard themes and layouts for different use cases" },
      { title: "Analytics Overview", image: "/skills/dashboard-ui.jpg", description: "Full-featured analytics dashboard with real-time data" },
    ]
  },
  {
    id: "css-generators",
    title: "CSS Art Generator",
    description: "Generate complex CSS art, animations, and geometric patterns with AI. Export clean, optimized CSS code.",
    category: "CSS",
    image: "/skills/css-generators.jpg",
    featured: false,
    tags: ["CSS", "Art", "Animation", "Generative"],
    stats: { uses: 6780, rating: 4.7, created: "2024-04-01" },
    markdown: `## CSS Art Generator

Create stunning CSS art and animations with AI assistance.

### Features
- CSS-only illustrations
- Keyframe animations
- Geometric patterns
- Gradient meshes
- Responsive scaling

### Generated Example
\`\`\`css
/* Mandala pattern */
.mandala {
  position: relative;
  width: 400px;
  height: 400px;
}

.mandala::before,
.mandala::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: conic-gradient(
    from 0deg,
    #ff2a2a 0deg 30deg,
    transparent 30deg 60deg,
    #ff2a2a 60deg 90deg,
    transparent 90deg 360deg
  );
  animation: rotate 10s linear infinite;
}

.mandala::after {
  animation-direction: reverse;
  opacity: 0.5;
}

@keyframes rotate {
  to { transform: rotate(360deg); }
}
\`\`\`

### Output Formats
- Pure CSS
- SCSS/Sass
- CSS Modules
- Styled Components`,
    htmlPreview: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CSS Art Preview</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            background: #0a0a0a; 
            display: flex; 
            justify-content: center; 
            align-items: center; 
            min-height: 100vh;
            font-family: 'Space Mono', monospace;
        }
        .art-container {
            width: 450px;
            background: #111;
            border-radius: 16px;
            overflow: hidden;
            border: 1px solid #ff2a2a33;
        }
        .art-display {
            height: 300px;
            display: flex;
            justify-content: center;
            align-items: center;
            background: #050505;
            position: relative;
        }
        .mandala {
            width: 200px;
            height: 200px;
            position: relative;
        }
        .mandala-ring {
            position: absolute;
            inset: 0;
            border-radius: 50%;
            border: 2px solid transparent;
            border-top-color: #ff2a2a;
            border-bottom-color: #ff2a2a;
            animation: spin 8s linear infinite;
        }
        .mandala-ring:nth-child(2) { inset: 20px; animation-duration: 6s; animation-direction: reverse; }
        .mandala-ring:nth-child(3) { inset: 40px; animation-duration: 4s; }
        .mandala-ring:nth-child(4) { inset: 60px; animation-duration: 10s; animation-direction: reverse; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .code-bar {
            padding: 12px 16px;
            background: #1a1a1a;
            border-top: 1px solid #222;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .code-info { color: #666; font-size: 11px; }
        .code-size { color: #ff2a2a; font-size: 11px; }
        .export-btn {
            padding: 6px 14px;
            background: transparent;
            border: 1px solid #ff2a2a;
            color: #ff2a2a;
            border-radius: 6px;
            font-size: 10px;
            cursor: pointer;
            font-family: 'Space Mono', monospace;
        }
    </style>
</head>
<body>
    <div class="art-container">
        <div class="art-display">
            <div class="mandala">
                <div class="mandala-ring"></div>
                <div class="mandala-ring"></div>
                <div class="mandala-ring"></div>
                <div class="mandala-ring"></div>
            </div>
        </div>
        <div class="code-bar">
            <span class="code-info">mandala.css</span>
            <span class="code-size">2.4 KB</span>
            <button class="export-btn">COPY CSS</button>
        </div>
    </div>
</body>
</html>`,
    examples: [
      { title: "CSS Art Gallery", image: "/skills/examples/css-gallery.jpg", description: "Collection of CSS-only art and animations" },
      { title: "Geometric Mandala", image: "/skills/css-generators.jpg", description: "Complex geometric patterns generated with CSS" },
    ]
  },
  {
    id: "svg-generators",
    title: "SVG Illustration Engine",
    description: "Generate scalable vector illustrations with AI. Perfect for icons, illustrations, and data visualizations.",
    category: "SVG",
    image: "/skills/svg-generators.jpg",
    featured: false,
    tags: ["SVG", "Vector", "Illustration", "Icons"],
    stats: { uses: 9340, rating: 4.8, created: "2024-02-28" },
    markdown: `## SVG Illustration Engine

AI-powered SVG generation for scalable graphics.

### Features
- Text-to-SVG generation
- Icon sets
- Illustrations
- Data visualizations
- Animation export

### Example
\`\`\`svg
<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#ff2a2a"/>
      <stop offset="100%" style="stop-color:#8b0000"/>
    </linearGradient>
  </defs>
  <circle cx="100" cy="100" r="80" fill="url(#grad)" opacity="0.8"/>
  <circle cx="100" cy="100" r="60" fill="none" stroke="#fff" stroke-width="2"/>
</svg>
\`\`\`

### Export Formats
- SVG (optimized)
- PNG
- PDF
- Figma component`,
    htmlPreview: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SVG Preview</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            background: #0a0a0a; 
            display: flex; 
            justify-content: center; 
            align-items: center; 
            min-height: 100vh;
            font-family: 'Inter', sans-serif;
        }
        .svg-preview {
            width: 400px;
            background: #111;
            border-radius: 16px;
            overflow: hidden;
            border: 1px solid #ff2a2a33;
            padding: 30px;
        }
        .svg-display {
            width: 100%;
            height: 250px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .generated-svg {
            width: 180px;
            height: 180px;
        }
        .svg-meta {
            display: flex;
            justify-content: space-between;
            margin-top: 16px;
            padding-top: 16px;
            border-top: 1px solid #222;
        }
        .meta-item { text-align: center; }
        .meta-label { color: #666; font-size: 10px; text-transform: uppercase; }
        .meta-value { color: #fff; font-size: 14px; font-weight: 600; margin-top: 4px; }
    </style>
</head>
<body>
    <div class="svg-preview">
        <div class="svg-display">
            <svg class="generated-svg" viewBox="0 0 200 200">
                <defs>
                    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style="stop-color:#ff2a2a"/>
                        <stop offset="100%" style="stop-color:#8b0000"/>
                    </linearGradient>
                </defs>
                <rect x="20" y="20" width="160" height="160" rx="20" fill="url(#grad)" opacity="0.3"/>
                <circle cx="100" cy="100" r="60" fill="url(#grad)" opacity="0.6"/>
                <circle cx="100" cy="100" r="30" fill="#fff" opacity="0.9"/>
            </svg>
        </div>
        <div class="svg-meta">
            <div class="meta-item">
                <div class="meta-label">Size</div>
                <div class="meta-value">2.1 KB</div>
            </div>
            <div class="meta-item">
                <div class="meta-label">Elements</div>
                <div class="meta-value">4</div>
            </div>
            <div class="meta-item">
                <div class="meta-label">Optimized</div>
                <div class="meta-value">Yes</div>
            </div>
        </div>
    </div>
</body>
</html>`,
    examples: [
      { title: "Isometric City", image: "/skills/svg-generators.jpg", description: "Vector city illustration in isometric perspective" },
    ]
  },
  {
    id: "ai-chatbots",
    title: "AI Chatbot Builder",
    description: "Build intelligent chatbots with natural language processing, custom personalities, and multi-platform deployment.",
    category: "AI",
    image: "/skills/ai-chatbots.jpg",
    featured: false,
    tags: ["AI", "NLP", "Chatbot", "Automation"],
    stats: { uses: 15600, rating: 4.9, created: "2024-01-05" },
    markdown: `## AI Chatbot Builder

Create intelligent conversational AI agents.

### Features
- Natural language processing
- Custom personalities
- Multi-platform deployment
- Conversation analytics
- Knowledge base integration

### Quick Start
\`\`\`python
from buildradar import Chatbot

bot = Chatbot(
    name="Assistant",
    personality="friendly and professional",
    knowledge_base="docs/"
)

@bot.on_message
def handle_message(message):
    return bot.respond(message)

bot.deploy(platform="web")
\`\`\`

### Supported Platforms
- Web (embed)
- Slack
- Discord
- WhatsApp
- Telegram`,
    htmlPreview: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chatbot Preview</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            background: #0a0a0a; 
            display: flex; 
            justify-content: center; 
            align-items: center; 
            min-height: 100vh;
            font-family: 'Inter', sans-serif;
        }
        .chat-container {
            width: 380px;
            height: 500px;
            background: #111;
            border-radius: 20px;
            overflow: hidden;
            border: 1px solid #ff2a2a33;
            display: flex;
            flex-direction: column;
        }
        .chat-header {
            padding: 16px 20px;
            background: #1a1a1a;
            border-bottom: 1px solid #222;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .bot-avatar {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            background: linear-gradient(135deg, #ff2a2a, #8b0000);
            display: flex;
            align-items: center;
            justify-content: center;
            color: #fff;
            font-size: 14px;
            font-weight: 700;
        }
        .bot-info { flex: 1; }
        .bot-name { color: #fff; font-size: 14px; font-weight: 600; }
        .bot-status { color: #00ff9d; font-size: 11px; }
        .chat-body {
            flex: 1;
            padding: 20px;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
            gap: 12px;
        }
        .message {
            max-width: 75%;
            padding: 10px 14px;
            border-radius: 14px;
            font-size: 13px;
            line-height: 1.4;
        }
        .message.bot {
            background: #1a1a1a;
            color: #e0e0e0;
            align-self: flex-start;
            border-bottom-left-radius: 4px;
        }
        .message.user {
            background: #ff2a2a22;
            color: #fff;
            align-self: flex-end;
            border-bottom-right-radius: 4px;
            border: 1px solid #ff2a2a33;
        }
        .chat-input {
            padding: 12px 16px;
            border-top: 1px solid #222;
            display: flex;
            gap: 8px;
        }
        .input-field {
            flex: 1;
            padding: 10px 14px;
            background: #1a1a1a;
            border: 1px solid #222;
            border-radius: 10px;
            color: #fff;
            font-size: 13px;
            outline: none;
        }
        .send-btn {
            width: 40px;
            height: 40px;
            border-radius: 10px;
            background: #ff2a2a;
            border: none;
            color: #000;
            font-size: 16px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    </style>
</head>
<body>
    <div class="chat-container">
        <div class="chat-header">
            <div class="bot-avatar">AI</div>
            <div class="bot-info">
                <div class="bot-name">Build Assistant</div>
                <div class="bot-status">● Online</div>
            </div>
        </div>
        <div class="chat-body">
            <div class="message bot">Hello! How can I help you today?</div>
            <div class="message user">Show me available skills</div>
            <div class="message bot">I found 10 skills matching your request. Here are the top results...</div>
        </div>
        <div class="chat-input">
            <input class="input-field" placeholder="Type a message...">
            <button class="send-btn">&#10148;</button>
        </div>
    </div>
</body>
</html>`,
    examples: [
      { title: "Holographic Interface", image: "/skills/ai-chatbots.jpg", description: "Futuristic chatbot UI with glass morphism" },
    ]
  },
  {
    id: "kinetic-type",
    title: "Kinetic Typography",
    description: "Create animated text effects with physics-based motion, particle systems, and scroll-driven animations.",
    category: "Typography",
    image: "/skills/kinetic-type.jpg",
    featured: false,
    tags: ["Typography", "Animation", "Motion", "Canvas"],
    stats: { uses: 5420, rating: 4.6, created: "2024-05-10" },
    markdown: `## Kinetic Typography

Animated text effects with physics-based motion.

### Features
- Physics-based text animation
- Particle text effects
- Scroll-driven motion
- GSAP integration
- Canvas rendering

### Example
\`\`\`javascript
import { KineticText } from '@buildradar/typography';

const text = new KineticText('#canvas', {
  text: 'HELLO WORLD',
  effect: 'particles',
  physics: {
    gravity: 0.5,
    bounce: 0.8
  }
});

text.animate();
\`\`\`

### Effects
- Particle explosion
- Wave motion
- Typewriter
- Scramble
- Morph
- Physics simulation`,
    htmlPreview: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kinetic Type Preview</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            background: #050505; 
            display: flex; 
            justify-content: center; 
            align-items: center; 
            min-height: 100vh;
            font-family: 'Inter', sans-serif;
            overflow: hidden;
        }
        .type-container {
            text-align: center;
            position: relative;
        }
        .kinetic-text {
            font-size: 72px;
            font-weight: 800;
            color: transparent;
            -webkit-text-stroke: 1px #ff2a2a;
            position: relative;
            letter-spacing: -2px;
        }
        .kinetic-text::after {
            content: 'FLOW';
            position: absolute;
            left: 4px;
            top: 4px;
            color: #ff2a2a22;
            -webkit-text-stroke: 0;
            z-index: -1;
        }
        .particles {
            position: absolute;
            inset: 0;
            pointer-events: none;
        }
        .particle {
            position: absolute;
            width: 3px;
            height: 3px;
            background: #ff2a2a;
            border-radius: 50%;
            animation: float 3s ease-in-out infinite;
        }
        @keyframes float {
            0%, 100% { transform: translateY(0) scale(1); opacity: 0.6; }
            50% { transform: translateY(-30px) scale(1.5); opacity: 1; }
        }
        .subtitle {
            color: #666;
            font-size: 12px;
            margin-top: 24px;
            font-family: 'Space Mono', monospace;
            letter-spacing: 4px;
            text-transform: uppercase;
        }
    </style>
</head>
<body>
    <div class="type-container">
        <div class="particles">
            <div class="particle" style="left:10%;top:20%;animation-delay:0s"></div>
            <div class="particle" style="left:30%;top:60%;animation-delay:0.5s"></div>
            <div class="particle" style="left:50%;top:10%;animation-delay:1s"></div>
            <div class="particle" style="left:70%;top:70%;animation-delay:1.5s"></div>
            <div class="particle" style="left:90%;top:30%;animation-delay:2s"></div>
        </div>
        <div class="kinetic-text">FLOW</div>
        <div class="subtitle">Kinetic Typography Engine</div>
    </div>
</body>
</html>`,
    examples: [
      { title: "Typography Explosion", image: "/skills/kinetic-type.jpg", description: "3D kinetic text with particle effects" },
    ]
  },
  {
    id: "data-viz",
    title: "Data Visualization",
    description: "Transform complex datasets into beautiful, interactive visualizations with D3.js and Canvas.",
    category: "Data",
    image: "/skills/data-viz.jpg",
    featured: false,
    tags: ["Data", "D3.js", "Charts", "Canvas"],
    stats: { uses: 7890, rating: 4.8, created: "2024-03-01" },
    markdown: `## Data Visualization

Transform data into beautiful interactive visualizations.

### Features
- D3.js integration
- Canvas rendering
- Interactive filters
- Real-time updates
- Export to image

### Example
\`\`\`javascript
import { NetworkGraph } from '@buildradar/viz';

const graph = new NetworkGraph('#container', {
  data: nodes,
  links: edges,
  physics: true,
  interactive: true
});

graph.on('click', (node) => {
  console.log('Selected:', node.id);
});
\`\`\`

### Chart Types
- Network graph
- Force-directed
- Sankey diagram
- Treemap
- Sunburst
- Chord diagram`,
    htmlPreview: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Data Viz Preview</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            background: #0a0a0a; 
            display: flex; 
            justify-content: center; 
            align-items: center; 
            min-height: 100vh;
            font-family: 'Inter', sans-serif;
        }
        .viz-container {
            width: 500px;
            background: #111;
            border-radius: 16px;
            overflow: hidden;
            border: 1px solid #ff2a2a33;
            padding: 24px;
        }
        .viz-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
        }
        .viz-title { color: #fff; font-size: 16px; font-weight: 600; }
        .viz-badge {
            padding: 4px 10px;
            background: rgba(255,42,42,0.1);
            color: #ff2a2a;
            border-radius: 4px;
            font-size: 10px;
            font-family: 'Space Mono', monospace;
        }
        .network-viz {
            height: 300px;
            position: relative;
            background: #0a0a0a;
            border-radius: 12px;
            overflow: hidden;
        }
        .node {
            position: absolute;
            border-radius: 50%;
            animation: pulse 2s ease-in-out infinite;
        }
        .node.large { width: 20px; height: 20px; background: #ff2a2a; }
        .node.medium { width: 12px; height: 12px; background: #ff5a5a; }
        .node.small { width: 8px; height: 8px; background: #b30000; }
        @keyframes pulse {
            0%, 100% { transform: scale(1); opacity: 0.8; }
            50% { transform: scale(1.3); opacity: 1; }
        }
        .connection {
            position: absolute;
            height: 1px;
            background: linear-gradient(90deg, transparent, #ff2a2a44, transparent);
            transform-origin: left center;
        }
    </style>
</head>
<body>
    <div class="viz-container">
        <div class="viz-header">
            <div class="viz-title">Neural Network Map</div>
            <div class="viz-badge">LIVE DATA</div>
        </div>
        <div class="network-viz">
            <div class="node large" style="left:50%;top:50%;transform:translate(-50%,-50%)"></div>
            <div class="node medium" style="left:25%;top:30%"></div>
            <div class="node medium" style="left:75%;top:25%"></div>
            <div class="node medium" style="left:20%;top:70%"></div>
            <div class="node medium" style="left:80%;top:65%"></div>
            <div class="node small" style="left:40%;top:20%"></div>
            <div class="node small" style="left:60%;top:80%"></div>
            <div class="connection" style="left:50%;top:50%;width:120px;transform:rotate(-30deg)"></div>
            <div class="connection" style="left:50%;top:50%;width:130px;transform:rotate(20deg)"></div>
            <div class="connection" style="left:50%;top:50%;width:100px;transform:rotate(150deg)"></div>
        </div>
    </div>
</body>
</html>`,
    examples: [
      { title: "Neural Network", image: "/skills/data-viz.jpg", description: "Interactive network visualization with D3.js" },
    ]
  },
  {
    id: "3d-animations",
    title: "3D Animation Studio",
    description: "Create cinematic 3D animations with keyframe editing, particle systems, and physics simulations.",
    category: "3D",
    image: "/skills/3d-animations.jpg",
    featured: true,
    tags: ["3D", "Animation", "Three.js", "Motion"],
    stats: { uses: 7120, rating: 4.7, created: "2024-04-15" },
    markdown: `## 3D Animation Studio

Create cinematic 3D animations in the browser.

### Features
- Keyframe animation editor
- Particle systems
- Physics simulation
- Camera paths
- Timeline scrubbing

### Example
\`\`\`javascript
import { AnimationStudio } from '@buildradar/3d';

const studio = new AnimationStudio('#canvas');

studio.loadModel('scene.glb');

studio.timeline
  .at(0).move(camera).to({ x: 0, y: 5, z: 10 })
  .at(2).rotate(model).by({ y: 180 })
  .at(4).emit(particles).count(1000);

studio.play();
\`\`\`

### Export
- Video (MP4, WebM)
- GIF
- Image sequence
- Three.js code`,
    htmlPreview: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>3D Animation Preview</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            background: #050505; 
            display: flex; 
            justify-content: center; 
            align-items: center; 
            min-height: 100vh;
            font-family: 'Space Mono', monospace;
        }
        .anim-preview {
            width: 480px;
            background: #111;
            border-radius: 16px;
            overflow: hidden;
            border: 1px solid #ff2a2a33;
        }
        .anim-viewport {
            height: 300px;
            background: #0a0a0a;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
            overflow: hidden;
        }
        .shape {
            width: 80px;
            height: 80px;
            position: absolute;
        }
        .shape.sphere {
            border-radius: 50%;
            background: radial-gradient(circle at 30% 30%, #ffb3b3, #8b0000);
            animation: bounce 2s ease-in-out infinite;
        }
        .shape.cube {
            background: linear-gradient(135deg, #ff2a2a, #9b1c1c);
            animation: spin3d 4s linear infinite;
            right: 80px;
        }
        .shape.pyramid {
            width: 0;
            height: 0;
            border-left: 40px solid transparent;
            border-right: 40px solid transparent;
            border-bottom: 80px solid #ff5a5a;
            background: transparent;
            animation: float3d 3s ease-in-out infinite;
            left: 80px;
        }
        @keyframes bounce {
            0%, 100% { transform: translateY(-30px); }
            50% { transform: translateY(30px); }
        }
        @keyframes spin3d {
            to { transform: rotateY(360deg); }
        }
        @keyframes float3d {
            0%, 100% { transform: translateY(0) rotateZ(-5deg); }
            50% { transform: translateY(-20px) rotateZ(5deg); }
        }
        .timeline {
            padding: 16px 20px;
            background: #1a1a1a;
            border-top: 1px solid #222;
        }
        .timeline-track {
            height: 30px;
            background: #0a0a0a;
            border-radius: 6px;
            position: relative;
            overflow: hidden;
        }
        .timeline-progress {
            position: absolute;
            left: 0;
            top: 0;
            height: 100%;
            width: 45%;
            background: linear-gradient(90deg, #ff2a2a22, #ff2a2a);
        }
        .timeline-time {
            display: flex;
            justify-content: space-between;
            margin-top: 8px;
            color: #666;
            font-size: 10px;
        }
        .controls {
            display: flex;
            gap: 8px;
            padding: 12px 20px;
        }
        .ctrl-btn {
            padding: 6px 14px;
            background: #222;
            border: 1px solid #333;
            color: #fff;
            border-radius: 6px;
            font-size: 10px;
            cursor: pointer;
            font-family: 'Space Mono', monospace;
        }
        .ctrl-btn:hover { background: #333; }
    </style>
</head>
<body>
    <div class="anim-preview">
        <div class="anim-viewport">
            <div class="shape pyramid"></div>
            <div class="shape sphere"></div>
            <div class="shape cube"></div>
        </div>
        <div class="timeline">
            <div class="timeline-track">
                <div class="timeline-progress"></div>
            </div>
            <div class="timeline-time">
                <span>00:00</span>
                <span>00:04.5 / 00:10</span>
            </div>
        </div>
        <div class="controls">
            <button class="ctrl-btn">PLAY</button>
            <button class="ctrl-btn">STOP</button>
            <button class="ctrl-btn">EXPORT</button>
        </div>
    </div>
</body>
</html>`,
    examples: [
      { title: "Morphing Shapes", image: "/skills/3d-animations.jpg", description: "Cinematic 3D shape morphing with physics" },
    ]
  },
  {
    id: "html-templates",
    title: "HTML Template Engine",
    description: "A ready-to-give-away pack with eight self-contained one-page HTML templates for creators and builders.",
    category: "HTML",
    image: "/skills/html-templates.jpg",
    featured: false,
    tags: ["HTML", "Templates", "Responsive", "CSS"],
    stats: { uses: 18900, rating: 4.8, created: "2024-01-15" },
    markdown: `## HTML Template Engine

Eight production-ready single-file HTML templates for creators, builders, and digital product sellers.

### Included Templates
- Agent Command Center
- AI Tool Directory
- Creator Launch Page
- Product Waitlist
- Resource Library
- Mini Course Hub
- Client Portal Lite
- Prompt Pack Sales Page

### What Makes It Useful
- No build step
- Inline CSS
- Responsive layouts
- Semantic HTML
- Editable real copy
- Strong visual systems

### Package Folder
\`HTML TEMPLATE Engine/\` contains the skill guide plus all eight editable HTML files.`,
    htmlPreview: htmlTemplateEngineExamples[0].html,
    examples: htmlTemplateEngineExamples
  },
];

export const categories = [...new Set(skills.map(s => s.category))];
