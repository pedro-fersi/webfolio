// src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HeaderMarquee from "./components/HeaderMarquee";
import Landing from "./pages/Landing";

const tools = [
  "Figma",
  "After Effects",
  "Premiere",
  "Davinci Resolve",
  "Illustrator",
  "Photoshop",
];

export default function App() {
  return (
    <BrowserRouter>
      <HeaderMarquee
        items={tools}
        speed={120}
        gap={48}
        paddingX={48}
        height={48}
        bg="#F5C518"
        color="#FCF6EB"
        fontSize={16}
        fixed
        autoHide
      />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/sobre" element={<Landing initialTarget="sobre" />} />
        <Route path="/trabalhos" element={<Landing initialTarget="trabalhos" />} />
        <Route path="/contato" element={<Landing initialTarget="contato" />} />
      </Routes>
    </BrowserRouter>
  );
}
