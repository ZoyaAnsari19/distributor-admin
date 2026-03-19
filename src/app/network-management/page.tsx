
"use client";

import { useMemo, useState } from "react";
import {
  Users,
  Store,
  UserCheck,
  UserX,
  Search,
  Filter,
  ChevronRight,
  ChevronDown,
} from "lucide-react";

import { KpiCard } from "@/components/ui/kpicards";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/utils";

type AgentStatus = "active" | "inactive";
type RetailerStatus = "active" | "inactive";

type Agent = {
  id: string;
  name: string;
  email: string;
  phone: string;
  retailers: number;
  totalOrders: number;
  revenue: string;
  status: AgentStatus;
};

type Retailer = {
  id: string;
  name: string;
  agentName: string;
  orders: number;
  revenue: string;
  status: RetailerStatus;
};

const mockAgents: Agent[] = [
  {
    id: "AG-1024",
    name: "Ayush Sharma",
    email: "ayush.sharma@securepharma.com",
    phone: "+91 98765 43210",
    retailers: 32,
    totalOrders: 428,
    revenue: "₹ 18.4L",
    status: "active",
  },
  {
    id: "AG-1025",
    name: "Neha Verma",
    email: "neha.verma@securepharma.com",
    phone: "+91 98220 11447",
    retailers: 21,
    totalOrders: 286,
    revenue: "₹ 11.2L",
    status: "active",
  },
  {
    id: "AG-1026",
    name: "Sanjay Kumar",
    email: "sanjay.kumar@securepharma.com",
    phone: "+91 99887 66554",
    retailers: 14,
    totalOrders: 162,
    revenue: "₹ 6.7L",
    status: "inactive",
  },
];

const mockRetailers: Retailer[] = [
  {
    id: "RT-5842",
    name: "True Beauty Mart",
    agentName: "Ayush Sharma",
    orders: 162,
    revenue: "₹ 7.8L",
    status: "active",
  },
  {
    id: "RT-5843",
    name: "Glow & Care Pharmacy",
    agentName: "Neha Verma",
    orders: 94,
    revenue: "₹ 4.1L",
    status: "active",
  },
  {
    id: "RT-5844",
    name: "Sanjay General Store",
    agentName: "Sanjay Kumar",
    orders: 58,
    revenue: "₹ 2.3L",
    status: "inactive",
  },
];

function StatusBadge({
  status,
}: {
  status: AgentStatus | RetailerStatus;
}) {
  const normalized = status.toLowerCase();
  const label = normalized === "active" ? "Active" : "Inactive";

  const styles =
    normalized === "active"
      ? "bg-emerald-50 text-emerald-700 border-emerald-100"
      : "bg-rose-50 text-rose-700 border-rose-100";

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-medium",
        styles,
      )}
    >
      <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-current/70" />
      {label}
    </span>
  );
}

type ActiveTab = "agents" | "retailers";

export default function NetworkManagementPage() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("agents");
  const [agentSearch, setAgentSearch] = useState("");
  const [agentStatusFilter, setAgentStatusFilter] = useState<
    AgentStatus | "all"
  >("all");
  const [retailerSearch, setRetailerSearch] = useState("");
  const [retailerAgentFilter, setRetailerAgentFilter] =
    useState<string>("all");

  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [selectedRetailer, setSelectedRetailer] = useState<Retailer | null>(
    null,
  );
  const [drawerOpen, setDrawerOpen] = useState(false);

  const totalAgents = mockAgents.length;
  const totalRetailers = mockRetailers.length;
  const activeAgents = mockAgents.filter((a) => a.status === "active").length;
  const activeRetailers = mockRetailers.filter(
    (r) => r.status === "active",
  ).length;

  const filteredAgents = useMemo(() => {
    return mockAgents.filter((agent) => {
      const matchesSearch =
        !agentSearch ||
        agent.name.toLowerCase().includes(agentSearch.toLowerCase()) ||
        agent.email.toLowerCase().includes(agentSearch.toLowerCase()) ||
        agent.phone.toLowerCase().includes(agentSearch.toLowerCase());

      const matchesStatus =
        agentStatusFilter === "all" || agent.status === agentStatusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [agentSearch, agentStatusFilter]);

  const filteredRetailers = useMemo(() => {
    return mockRetailers.filter((retailer) => {
      const matchesSearch =
        !retailerSearch ||
        retailer.name.toLowerCase().includes(retailerSearch.toLowerCase());

      const matchesAgent =
        retailerAgentFilter === "all" ||
        retailer.agentName === retailerAgentFilter;

      return matchesSearch && matchesAgent;
    });
  }, [retailerSearch, retailerAgentFilter]);

  const openAgentDrawer = (agent: Agent) => {
    setSelectedRetailer(null);
    setSelectedAgent(agent);
    setDrawerOpen(true);
  };

  const openRetailerDrawer = (retailer: Retailer) => {
    setSelectedAgent(null);
    setSelectedRetailer(retailer);
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
    setSelectedAgent(null);
    setSelectedRetailer(null);
  };

  return (
    <div className="space-y-6 sm:space-y-7 lg:space-y-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-gray-900 sm:text-2xl">
            Network Management
          </h1>
          <p className="mt-1 text-xs text-gray-500 sm:text-sm">
            Manage agents and retailers under your distribution network.
          </p>
        </div>
      </div>

      {/* Summary cards */}
      <section aria-label="Network KPIs" className="space-y-3">
        <div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:gap-4 xl:grid-cols-4">
            <KpiCard
              title="Total Agents"
              value={totalAgents.toString()}
              trendLabel="+4.2%"
              trendPositive
              icon={Users}
              accent="indigo"
            />
            <KpiCard
              title="Total Retailers"
              value={totalRetailers.toString()}
              trendLabel="+9.8%"
              trendPositive
              icon={Store}
              accent="emerald"
            />
            <KpiCard
              title="Active Agents"
              value={activeAgents.toString()}
              trendLabel="+3 this week"
              trendPositive
              icon={UserCheck}
              accent="sky"
            />
            <KpiCard
              title="Active Retailers"
              value={activeRetailers.toString()}
              trendLabel="+12 this week"
              trendPositive
              icon={UserCheck}
              accent="pink"
            />
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="space-y-4 rounded-2xl border border-gray-100 bg-white/80 p-4 shadow-[0_10px_30px_rgba(15,23,42,0.04)] sm:p-5 lg:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex rounded-full bg-gray-50 p-1 text-xs shadow-inner">
            <button
              type="button"
              className={cn(
                "flex-1 rounded-full px-3.5 py-2 font-medium transition sm:px-4",
                activeTab === "agents"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-800",
              )}
              onClick={() => setActiveTab("agents")}
            >
              Agents
            </button>
            <button
              type="button"
              className={cn(
                "flex-1 rounded-full px-3.5 py-2 font-medium transition sm:px-4",
                activeTab === "retailers"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-800",
              )}
              onClick={() => setActiveTab("retailers")}
            >
              Retailers
            </button>
          </div>
        </div>

        {activeTab === "agents" ? (
          <AgentsTab
            agents={filteredAgents}
            rawAgents={mockAgents}
            search={agentSearch}
            onSearchChange={setAgentSearch}
            statusFilter={agentStatusFilter}
            onStatusFilterChange={setAgentStatusFilter}
            onOpenDetails={openAgentDrawer}
          />
        ) : (
          <RetailersTab
            retailers={filteredRetailers}
            rawRetailers={mockRetailers}
            rawAgents={mockAgents}
            search={retailerSearch}
            onSearchChange={setRetailerSearch}
            agentFilter={retailerAgentFilter}
            onAgentFilterChange={setRetailerAgentFilter}
            onOpenDetails={openRetailerDrawer}
          />
        )}
      </section>

      {/* Drawer */}
      <div
        className={cn(
          "fixed inset-0 z-40 flex justify-end bg-black/20 backdrop-blur-sm transition",
          drawerOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
        aria-hidden={!drawerOpen}
        onClick={closeDrawer}
      >
        <aside
          className={cn(
            "relative h-full w-full max-w-md translate-x-full bg-white shadow-2xl transition-transform duration-300 ease-out sm:rounded-l-3xl",
            drawerOpen && "translate-x-0",
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3 sm:px-5 sm:py-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-400">
                {selectedAgent ? "Agent details" : selectedRetailer ? "Retailer details" : "Details"}
              </p>
              <p className="text-sm font-semibold text-gray-900 sm:text-base">
                {selectedAgent?.name ?? selectedRetailer?.name ?? "—"}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full"
              onClick={closeDrawer}
            >
              <ChevronDown className="h-4 w-4 text-gray-600" />
            </Button>
          </div>

          <div className="beauty-scroll h-[calc(100%-3.5rem)] space-y-5 overflow-y-auto px-4 pb-6 pt-4 sm:px-5 sm:pt-5">
            {selectedAgent && (
              <AgentDetails agent={selectedAgent} retailers={mockRetailers} />
            )}
            {selectedRetailer && (
              <RetailerDetails retailer={selectedRetailer} agent={mockAgents[0]} />
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}

function AgentsTab({
  agents,
  rawAgents,
  search,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  onOpenDetails,
}: {
  agents: Agent[];
  rawAgents: Agent[];
  search: string;
  onSearchChange: (value: string) => void;
  statusFilter: AgentStatus | "all";
  onStatusFilterChange: (value: AgentStatus | "all") => void;
  onOpenDetails: (agent: Agent) => void;
}) {
  return (
    <div className="space-y-4">
      {/* Action bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 flex-col gap-2 sm:flex-row sm:items-center">
          <div className="relative flex-1 min-w-0">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search agents by name, email or phone..."
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-9 text-xs placeholder:text-[11px] sm:text-sm sm:placeholder:text-xs"
            />
          </div>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              className="h-9 rounded-full px-3 text-xs sm:px-4 sm:text-sm"
              onClick={() =>
                onStatusFilterChange(
                  statusFilter === "all"
                    ? "active"
                    : statusFilter === "active"
                    ? "inactive"
                    : "all",
                )
              }
            >
              <Filter className="mr-1.5 h-3.5 w-3.5" />
              {statusFilter === "all"
                ? "All statuses"
                : statusFilter === "active"
                ? "Active only"
                : "Inactive only"}
            </Button>
          </div>
        </div>

        <Button
          type="button"
          variant="primary"
          className="h-9 rounded-full px-4 text-xs sm:h-10 sm:px-5 sm:text-sm"
        >
          Add Agent
        </Button>
      </div>

      {/* Mobile cards */}
      <div className="space-y-3 sm:hidden">
        {agents.map((agent) => (
          <button
            key={agent.id}
            type="button"
            onClick={() => onOpenDetails(agent)}
            className="w-full rounded-2xl border border-gray-100 bg-white/90 p-3.5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="text-[13px] font-semibold text-gray-900">
                  {agent.name}
                </p>
                <p className="mt-0.5 text-[11px] text-gray-500">
                  {agent.email}
                </p>
              </div>
              <StatusBadge status={agent.status} />
            </div>
            <div className="mt-2 flex items-center justify-between text-[11px] text-gray-500">
              <span>{agent.retailers} retailers</span>
              <span>{agent.totalOrders} orders</span>
              <span className="font-semibold text-gray-900">
                {agent.revenue}
              </span>
            </div>
          </button>
        ))}
        {agents.length === 0 && (
          <p className="py-6 text-center text-xs text-gray-500">
            No agents found for the selected filters.
          </p>
        )}
      </div>

      {/* Desktop / tablet table */}
      <div className="hidden overflow-x-auto rounded-2xl border border-gray-100 bg-white/60 sm:block">
        <table className="min-w-full text-left text-xs sm:text-sm">
          <thead className="border-b border-gray-100 bg-gray-50/60 text-[11px] font-medium uppercase tracking-[0.16em] text-gray-400">
            <tr>
              <th className="px-4 py-3 sm:px-5">Agent Name</th>
              <th className="px-4 py-3 sm:px-5">Email / Phone</th>
              <th className="px-4 py-3 sm:px-5 text-right">
                Assigned Retailers
              </th>
              <th className="px-4 py-3 sm:px-5 text-right">Total Orders</th>
              <th className="px-4 py-3 sm:px-5 text-right">Revenue</th>
              <th className="px-4 py-3 sm:px-5">Status</th>
              <th className="px-4 py-3 sm:px-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100/80">
            {agents.map((agent) => (
              <tr
                key={agent.id}
                className="align-middle hover:bg-pink-50/40"
              >
                <td className="whitespace-nowrap px-4 py-3 text-[12px] font-semibold text-gray-900 sm:px-5 sm:text-sm">
                  {agent.name}
                </td>
                <td className="max-w-[220px] px-4 py-3 text-[12px] text-gray-700 sm:max-w-xs sm:px-5 sm:text-sm">
                  <span className="block truncate">{agent.email}</span>
                  <span className="mt-0.5 block text-[11px] text-gray-400">
                    {agent.phone}
                  </span>
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-right text-[12px] text-gray-700 sm:px-5 sm:text-sm">
                  {agent.retailers}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-right text-[12px] text-gray-700 sm:px-5 sm:text-sm">
                  {agent.totalOrders}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-right text-[12px] font-semibold text-gray-900 sm:px-5 sm:text-sm">
                  {agent.revenue}
                </td>
                <td className="px-4 py-3 sm:px-5">
                  <StatusBadge status={agent.status} />
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-right text-[12px] sm:px-5 sm:text-sm">
                  <div className="inline-flex items-center gap-1.5">
                    <Button
                      type="button"
                      variant="subtle"
                      size="sm"
                      className="h-8 rounded-full px-3 text-[11px]"
                      onClick={() => onOpenDetails(agent)}
                    >
                      View
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="h-8 rounded-full px-3 text-[11px]"
                    >
                      Edit
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-8 rounded-full px-3 text-[11px] text-rose-600 hover:bg-rose-50"
                    >
                      Disable
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
            {agents.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-6 text-center text-xs text-gray-500 sm:px-5"
                >
                  No agents found for the selected filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function RetailersTab({
  retailers,
  rawRetailers,
  rawAgents,
  search,
  onSearchChange,
  agentFilter,
  onAgentFilterChange,
  onOpenDetails,
}: {
  retailers: Retailer[];
  rawRetailers: Retailer[];
  rawAgents: Agent[];
  search: string;
  onSearchChange: (value: string) => void;
  agentFilter: string;
  onAgentFilterChange: (value: string) => void;
  onOpenDetails: (retailer: Retailer) => void;
}) {
  const uniqueAgents = Array.from(
    new Set(rawRetailers.map((r) => r.agentName)),
  );

  return (
    <div className="space-y-4">
      {/* Action bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 flex-col gap-2 sm:flex-row sm:items-center">
          <div className="relative flex-1 min-w-0">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search retailers by name..."
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-9 text-xs placeholder:text-[11px] sm:text-sm sm:placeholder:text-xs"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              className="h-9 rounded-full border border-pink-200 bg-white px-3 text-xs text-gray-700 shadow-sm focus:border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-100 sm:text-sm"
              value={agentFilter}
              onChange={(e) => onAgentFilterChange(e.target.value)}
            >
              <option value="all">All agents</option>
              {uniqueAgents.map((agentName) => (
                <option key={agentName} value={agentName}>
                  {agentName}
                </option>
              ))}
            </select>
          </div>
        </div>

        <Button
          type="button"
          variant="primary"
          className="h-9 rounded-full px-4 text-xs sm:h-10 sm:px-5 sm:text-sm"
        >
          Add Retailer
        </Button>
      </div>

      {/* Mobile cards */}
      <div className="space-y-3 sm:hidden">
        {retailers.map((retailer) => (
          <button
            key={retailer.id}
            type="button"
            onClick={() => onOpenDetails(retailer)}
            className="w-full rounded-2xl border border-gray-100 bg-white/90 p-3.5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="text-[13px] font-semibold text-gray-900">
                  {retailer.name}
                </p>
                <p className="mt-0.5 text-[11px] text-gray-500">
                  Agent: {retailer.agentName}
                </p>
              </div>
              <StatusBadge status={retailer.status} />
            </div>
            <div className="mt-2 flex items-center justify-between text-[11px] text-gray-500">
              <span>{retailer.orders} orders</span>
              <span className="font-semibold text-gray-900">
                {retailer.revenue}
              </span>
            </div>
          </button>
        ))}
        {retailers.length === 0 && (
          <p className="py-6 text-center text-xs text-gray-500">
            No retailers found for the selected filters.
          </p>
        )}
      </div>

      {/* Desktop / tablet table */}
      <div className="hidden overflow-x-auto rounded-2xl border border-gray-100 bg-white/60 sm:block">
        <table className="min-w-full text-left text-xs sm:text-sm">
          <thead className="border-b border-gray-100 bg-gray-50/60 text-[11px] font-medium uppercase tracking-[0.16em] text-gray-400">
            <tr>
              <th className="px-4 py-3 sm:px-5">Retailer Name</th>
              <th className="px-4 py-3 sm:px-5">Assigned Agent</th>
              <th className="px-4 py-3 sm:px-5 text-right">Orders</th>
              <th className="px-4 py-3 sm:px-5 text-right">Revenue</th>
              <th className="px-4 py-3 sm:px-5">Status</th>
              <th className="px-4 py-3 sm:px-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100/80">
            {retailers.map((retailer) => (
              <tr
                key={retailer.id}
                className="align-middle hover:bg-pink-50/40"
              >
                <td className="whitespace-nowrap px-4 py-3 text-[12px] font-semibold text-gray-900 sm:px-5 sm:text-sm">
                  {retailer.name}
                </td>
                <td className="px-4 py-3 text-[12px] text-gray-700 sm:px-5 sm:text-sm">
                  {retailer.agentName}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-right text-[12px] text-gray-700 sm:px-5 sm:text-sm">
                  {retailer.orders}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-right text-[12px] font-semibold text-gray-900 sm:px-5 sm:text-sm">
                  {retailer.revenue}
                </td>
                <td className="px-4 py-3 sm:px-5">
                  <StatusBadge status={retailer.status} />
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-right text-[12px] sm:px-5 sm:text-sm">
                  <div className="inline-flex items-center gap-1.5">
                    <Button
                      type="button"
                      variant="subtle"
                      size="sm"
                      className="h-8 rounded-full px-3 text-[11px]"
                      onClick={() => onOpenDetails(retailer)}
                    >
                      View
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="h-8 rounded-full px-3 text-[11px]"
                    >
                      Edit
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-8 rounded-full px-3 text-[11px] text-rose-600 hover:bg-rose-50"
                    >
                      Remove
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
            {retailers.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-6 text-center text-xs text-gray-500 sm:px-5"
                >
                  No retailers found for the selected filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AgentDetails({
  agent,
  retailers,
}: {
  agent: Agent;
  retailers: Retailer[];
}) {
  const assignedRetailers = retailers.filter(
    (r) => r.agentName === agent.name,
  );

  return (
    <div className="space-y-5">
      <section className="space-y-2 rounded-2xl border border-gray-100 bg-white/90 p-4 shadow-sm">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-400">
              Agent overview
            </p>
            <p className="mt-1 text-sm font-semibold text-gray-900">
              {agent.name}
            </p>
            <p className="mt-1 text-xs text-gray-500">{agent.email}</p>
            <p className="mt-0.5 text-xs text-gray-400">{agent.phone}</p>
          </div>
          <StatusBadge status={agent.status} />
        </div>

        <div className="mt-3 grid grid-cols-2 gap-3 text-xs text-gray-600">
          <div className="rounded-xl bg-gray-50 px-3 py-2">
            <p className="text-[11px] text-gray-400">Assigned retailers</p>
            <p className="mt-1 text-sm font-semibold text-gray-900">
              {agent.retailers}
            </p>
          </div>
          <div className="rounded-xl bg-gray-50 px-3 py-2">
            <p className="text-[11px] text-gray-400">Total orders</p>
            <p className="mt-1 text-sm font-semibold text-gray-900">
              {agent.totalOrders}
            </p>
          </div>
          <div className="rounded-xl bg-gray-50 px-3 py-2">
            <p className="text-[11px] text-gray-400">Revenue generated</p>
            <p className="mt-1 text-sm font-semibold text-gray-900">
              {agent.revenue}
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-3 rounded-2xl border border-gray-100 bg-white/90 p-4 shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-400">
            Assigned retailers
          </p>
          <span className="rounded-full bg-gray-50 px-2.5 py-1 text-[11px] text-gray-600">
            {assignedRetailers.length} retailers
          </span>
        </div>

        <div className="space-y-2">
          {assignedRetailers.map((retailer) => (
            <div
              key={retailer.id}
              className="flex items-center justify-between gap-2 rounded-xl border border-gray-100 bg-white px-3 py-2 text-xs"
            >
              <div>
                <p className="font-semibold text-gray-900">
                  {retailer.name}
                </p>
                <p className="mt-0.5 text-[11px] text-gray-500">
                  {retailer.orders} orders • {retailer.revenue}
                </p>
              </div>
              <ChevronRight className="h-4 w-4 text-gray-300" />
            </div>
          ))}
          {assignedRetailers.length === 0 && (
            <p className="py-4 text-center text-[11px] text-gray-500">
              No retailers assigned yet.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}

function RetailerDetails({
  retailer,
  agent,
}: {
  retailer: Retailer;
  agent: Agent;
}) {
  return (
    <div className="space-y-5">
      <section className="space-y-2 rounded-2xl border border-gray-100 bg-white/90 p-4 shadow-sm">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-400">
              Retailer overview
            </p>
            <p className="mt-1 text-sm font-semibold text-gray-900">
              {retailer.name}
            </p>
            <p className="mt-1 text-xs text-gray-500">ID: {retailer.id}</p>
          </div>
          <StatusBadge status={retailer.status} />
        </div>

        <div className="mt-3 grid grid-cols-2 gap-3 text-xs text-gray-600">
          <div className="rounded-xl bg-gray-50 px-3 py-2">
            <p className="text-[11px] text-gray-400">Orders</p>
            <p className="mt-1 text-sm font-semibold text-gray-900">
              {retailer.orders}
            </p>
          </div>
          <div className="rounded-xl bg-gray-50 px-3 py-2">
            <p className="text-[11px] text-gray-400">Revenue</p>
            <p className="mt-1 text-sm font-semibold text-gray-900">
              {retailer.revenue}
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-3 rounded-2xl border border-gray-100 bg-white/90 p-4 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-400">
          Assigned agent
        </p>
        <div className="flex items-center justify-between gap-3 rounded-xl border border-gray-100 bg-white px-3 py-2 text-xs">
          <div>
            <p className="font-semibold text-gray-900">{agent.name}</p>
            <p className="mt-0.5 text-[11px] text-gray-500">
              {agent.email}
            </p>
            <p className="mt-0.5 text-[11px] text-gray-400">
              {agent.phone}
            </p>
          </div>
          <ChevronRight className="h-4 w-4 text-gray-300" />
        </div>
      </section>

      <section className="space-y-3 rounded-2xl border border-gray-100 bg-white/90 p-4 text-xs text-gray-600 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-400">
          Recent orders
        </p>
        <p className="text-[11px] text-gray-500">
          Order history insights will appear here once integrated with the core
          orders module.
        </p>
      </section>
    </div>
  );
}