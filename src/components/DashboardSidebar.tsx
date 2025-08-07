
import { Calculator, BarChart3, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useLocation, useNavigate } from "react-router-dom";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useTranslation } from 'react-i18next';

export function DashboardSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isPremium } = useUserProfile();

  const menuItems = [
    {
      title: "Cost Calculator",
      icon: Calculator,
      path: "/dashboard/calculator",
      isActive: location.pathname === "/dashboard/calculator",
    },
    {
      title: "Property Analytics",
      icon: isPremium ? BarChart3 : Lock,
      path: "/dashboard/analytics",
      isActive: location.pathname === "/dashboard/analytics",
      disabled: !isPremium,
      premium: true,
    },
  ];

  const handleMenuClick = (item: any) => {
    if (item.disabled) {
      return; // Don't navigate if disabled
    }
    navigate(item.path);
  };

  return (
    <Sidebar className="w-64 border-r">
      <SidebarContent className="p-4">
        <div className="mb-4">
          <SidebarTrigger className="mb-2" />
        </div>
        <SidebarGroup>
          <SidebarGroupLabel className="text-sm font-semibold text-muted-foreground mb-2">
            Tools
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    onClick={() => handleMenuClick(item)}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                      item.isActive && "bg-primary text-primary-foreground",
                      !item.isActive && "hover:bg-accent hover:text-accent-foreground",
                      item.disabled && "opacity-50 cursor-not-allowed hover:bg-transparent"
                    )}
                    disabled={item.disabled}
                  >
                    <item.icon className="h-4 w-4 flex-shrink-0" />
                    <span className="flex items-center gap-2 flex-1">
                      {item.title}
                      {item.premium && !isPremium && (
                        <span className="text-xs bg-primary text-primary-foreground px-1.5 py-0.5 rounded">
                          PRO
                        </span>
                      )}
                    </span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
