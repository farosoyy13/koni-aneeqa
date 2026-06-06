import { Crown, MessageSquare, Settings, BarChart3 } from "lucide-react";
import OwnerDashboard from "./OwnerDashboard"; // استيراد المكون الجديد

export function OmnerRoom() {
  return (
    <div className="min-h-screen bg-[#050505] text-white p-4 md:p-8 font-sans">
      <div className="max-w-5xl mx-auto">
        
        {/* الجزء العلوي (الهيدر) */}
        <div className="flex flex-col md:flex-row items-center gap-6 mb-12 border-b border-[#d4af37] pb-8">
          <div className="p-4 bg-[#111] rounded-full border-2 border-[#d4af37]">
            <Crown size={48} className="text-[#d4af37]" />
          </div>
          <div className="text-center md:text-right">
            <h1 className="text-4xl md:text-5xl font-bold text-[#d4af37] mb-2">غرفة صاحب الموقع</h1>
            <p className="text-gray-400 text-lg">مركز التحكم والقيادة لمتجر أناقة CHIC</p>
          </div>
        </div>

        {/* استدعاء المكون الجديد الذي أنشأناه */}
        <div className="mb-12">
            <OwnerDashboard />
        </div>

        {/* بطاقات الإدارة */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <DashboardCard icon={<MessageSquare size={32} className="text-[#d4af37]" />} title="رسائل العملاء" desc="متابعة الشكاوى والاقتراحات" />
          <DashboardCard icon={<Settings size={32} className="text-[#d4af37]" />} title="إعدادات المتجر" desc="تعديل الأسعار والمنتجات" />
          <DashboardCard icon={<BarChart3 size={32} className="text-[#d4af37]" />} title="التقارير المالية" desc="متابعة المبيعات والأرباح" />
        </div>
      </div>
    </div>
  );
}

function DashboardCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="bg-[#111] p-6 rounded-3xl border border-[#333] hover:border-[#d4af37] transition-all hover:scale-105 group cursor-pointer">
      <div className="mb-4">{icon}</div>
      <h2 className="text-xl font-bold mb-2 group-hover:text-[#d4af37] transition-colors">{title}</h2>
      <p className="text-gray-400">{desc}</p>
    </div>
  );
}
