'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ChevronLeft, ChevronRight, Search, Loader2, Eye } from 'lucide-react';

interface Lead {
  id: string;
  name: string;
  organization: string | null;
  email: string;
  website: string | null;
  message: string;
  services: string[];
  status: string;
  createdAt: string;
}

interface LeadsResponse {
  leads: Lead[];
  total: number;
  page: number;
  totalPages: number;
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<string>('all');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        setIsLoading(true);
        const params = new URLSearchParams({
          page: page.toString(),
          limit: '10',
          ...(debouncedSearch && { search: debouncedSearch }),
          ...(status !== 'all' && { status }),
        });

        const response = await fetch(`/api/admin/leads?${params}`);
        if (!response.ok) {
          throw new Error('Failed to fetch leads');
        }

        const data: LeadsResponse = await response.json();
        setLeads(data.leads);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error('Error:', error);
        setError('Failed to fetch leads');
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeads();
  }, [page, debouncedSearch, status]);

  const handleStatusUpdate = async (id: string, newStatus: string) => {
    try {
      const response = await fetch('/api/admin/leads', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to update status');
      }

      setLeads(leads.map(lead => 
        lead.id === id ? { ...lead, status: newStatus } : lead
      ));
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl text-black font-bold">Leads Management</h2>
        <div className="flex items-center gap-4">
          <Select
            value={status}
            onValueChange={setStatus}
          >
            <SelectTrigger className="w-[180px] text-black">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="contacted">Contacted</SelectItem>
              <SelectItem value="converted">Converted</SelectItem>
              <SelectItem value="lost">Lost</SelectItem>
            </SelectContent>
          </Select>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search leads..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 text-black"
            />
          </div>
        </div>
      </div>

      <Card>
        {isLoading ? (
          <div className="flex justify-center items-center p-8">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : error ? (
          <div className="text-red-500 p-4">{error}</div>
        ) : (
          <div className="min-w-full">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Date
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Name
                  </th>
                  <th className="hidden md:table-cell px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Email
                  </th>
                  <th className="hidden lg:table-cell px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Services
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-4 text-sm font-medium text-gray-900">
                      {lead.name}
                      {lead.organization && (
                        <div className="text-xs text-gray-500">{lead.organization}</div>
                      )}
                    </td>
                    <td className="hidden md:table-cell px-4 py-4 text-sm text-gray-500">
                      {lead.email}
                    </td>
                    <td className="hidden lg:table-cell px-4 py-4 text-sm text-gray-500">
                      <div className="flex flex-wrap gap-1">
                        {lead.services.map((service, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800"
                          >
                            {service}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <Select
                        value={lead.status}
                        onValueChange={(value) => handleStatusUpdate(lead.id, value)}
                      >
                        <SelectTrigger className="w-[140px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="contacted">Contacted</SelectItem>
                          <SelectItem value="converted">Converted</SelectItem>
                          <SelectItem value="lost">Lost</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedLead(lead)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
          <Button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1 || isLoading}
            variant="outline"
            className="text-black"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>
          <span className="text-sm text-gray-700">
            Page {page} of {totalPages}
          </span>
          <Button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages || isLoading}
            variant="outline"
            className="text-black"
          >
            Next
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </Card>

      <Dialog open={!!selectedLead} onOpenChange={() => setSelectedLead(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Lead Details</DialogTitle>
          </DialogHeader>
          {selectedLead && (
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Date</label>
                  <p className="mt-1">
                    {new Date(selectedLead.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Status</label>
                  <p className="mt-1">{selectedLead.status}</p>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500">Name</label>
                <p className="mt-1">{selectedLead.name}</p>
              </div>

              {selectedLead.organization && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Organization</label>
                  <p className="mt-1">{selectedLead.organization}</p>
                </div>
              )}

              <div>
                <label className="text-sm font-medium text-gray-500">Email</label>
                <p className="mt-1">{selectedLead.email}</p>
              </div>

              {selectedLead.website && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Website</label>
                  <p className="mt-1">
                    <a 
                      href={selectedLead.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {selectedLead.website}
                    </a>
                  </p>
                </div>
              )}

              <div>
                <label className="text-sm font-medium text-gray-500">Services Interested In</label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {selectedLead.services.map((service, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500">Message</label>
                <p className="mt-1 whitespace-pre-wrap">{selectedLead.message}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
} 