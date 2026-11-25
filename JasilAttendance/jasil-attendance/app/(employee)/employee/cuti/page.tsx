"use client";

import { useState } from "react";
import { Upload } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon } from "lucide-react"; // sesuaikan dengan nama file di project Anda
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"; // bisa juga named "CalendarPopover" atau sejenisnya

export default function CutiPage() {
    const request= [
    { label: "Izin Sakit", value: "Izin Sakit" },
    { label: "Izin Terlambat", value: "Izin Terlambat" },
    { label: "Izin Pulang Awal", value: "Izin Pulang Awal" },
    { label: "Cuti Tahunan", value: "Cuti Tahunan" },
    { label: "Cuti Khusus", value: "Cuti Khusus" },
]
    const [tanggalMulai, setTanggalMulai] = useState<Date | undefined>();
    const [tanggalSelesai, setTanggalSelesai] = useState<Date | undefined>();

    const [file, setFile] = useState<File | null>(null);

    const dashboardData ={
        historySchedule: [
            {date: "12 Sep 2026", checkin:"08.02", checkout:"17.00", status:"tepat waktu", durasi:"24 Menit"},
            {date: "12 Sep 2026", checkin:"08.02", checkout:"17.00", status:"tepat waktu", durasi:"24 Menit"},
            {date: "12 Sep 2026", checkin:"08.02", checkout:"17.00", status:"tepat waktu", durasi:"24 Menit"},]}

    return (
        <>
        <main className='flex-1 min-h-screen'>
            <header className='top-header'>
                <h1 className='page-title'>Cuti & Izin</h1>
            </header>
            
            <div className='content-body'>
                <div className='stats-grid'>
                    <div className="section-card">
                        <div className="section-header">
                            <h2 className="section-title">Ajukan Cuti/Izin</h2>
                        </div>  
                        
                        <form className="w-full">
                            {/* Jenis permohonan */}
                            <div className="form-group">
                                <label className="form-label">Jenis Permohonan</label>
                                <Select>
                                <SelectTrigger className="form-select">
                                    <SelectValue placeholder="Pilih Jenis Permohonan" />
                                </SelectTrigger>
                                <SelectContent className="rounded-md p-2 flex-1 from-select">
                                {request.map((item) => (
                                    <SelectItem key={item.value} value={item.value} className="rounded-md">
                                    {item.label}
                                    </SelectItem>
                                ))}
                                </SelectContent>
                                </Select>
                            </div>
                            {/* Tanggal Mulai */}
                            <div className="form-group">
                                <label className="form-label">Tanggal Mulai</label>
                                    <Popover>
                                        <PopoverTrigger className="w-full">
                                        <Button
                                            id="tanggal-mulai"
                                            variant="outline"
                                            className="form-input justify-start text-left font-normal"
                                        >
                                            {tanggalMulai ? (
                                            tanggalMulai.toLocaleDateString("id-ID", {
                                                day: "2-digit",
                                                month: "long",
                                                year: "numeric",
                                            })
                                            ) : (
                                            <span className="text-muted-foreground">dd/mm/yyyy</span>
                                            )}
                                            <CalendarIcon className="ml-auto h-4 w-4" />
                                        </Button>
                                        </PopoverTrigger>

                                        <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={tanggalMulai}
                                            onSelect={setTanggalMulai}
                                            className="rounded-sm"
                                        />
                                        </PopoverContent>
                                    </Popover>
                            </div>
                            {/* Tanggal Selesai */}
                            <div className="form-group">
                                <label className="form-label">Tanggal Selesai</label>
                                <Popover>
                                        <PopoverTrigger className="from-input w-full">
                                        <Button
                                            id="tanggal-selesai"
                                            variant="outline"
                                            className="form-input justify-start text-left font-normal"
                                        >
                                            {tanggalSelesai ? (
                                            tanggalSelesai.toLocaleDateString("id-ID", {
                                                day: "2-digit",
                                                month: "long",
                                                year: "numeric",
                                            })
                                            ) : (
                                            <span className="text-muted-foreground">dd/mm/yyyy</span>
                                            )}
                                            <CalendarIcon className="ml-auto h-4 w-4" />
                                        </Button>
                                        </PopoverTrigger>

                                        <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={tanggalSelesai}
                                            onSelect={setTanggalSelesai}
                                            className="rounded-sm"
                                        />
                                        </PopoverContent>
                                    </Popover>
                            </div>
                            {/* Box Keterangan */}
                            <div className="form-group">
                                <label className="form-label">Alasan/Keterangan</label>
                                <textarea className="form-textarea" placeholder="Jelaskan permohonan cuti/izin anda"></textarea>
                            </div>
                            {/* Upload File */}
                            <div className="form-group">
                            <label className="form-label">Upload Surat Dokter / Dokumen Pendukung</label>
                                <div className="flex-col flex">
                                <label htmlFor="file-upload" className="file-upload">
                                <Upload className="w-full w-5 h-5 flex items-center justify-center " />
                                <p className="text-sm text-zinc-500">Klik untuk upload atau drag & drop file di sini</p>
                                <p className="text-[10px] text-zinc-400">Format: JPG, PNG, PDF (Maks. 5MB)</p>
                                {file && (
                                    <p className="mt-2 text-sm text-zinc-500">
                                        Dipilih: {file.name}
                                </p>
                                )}
                                </label>
                                <input
                                id="file-upload"
                                type="file"
                                className="hidden"
                                accept=".pdf,.png,.jpg,.jpeg"
                                />
                                </div>
                    
                            </div>
                            <Button className="btn primary">Kirim Permohonan</Button>
                        </form>                                            
                    </div>
                </div>
                <div className="stats-grid">
                    <div className="section-card">
                        <div className="section-header">
                            <h2 className="section-title">Riwayat Permohonan</h2>
                        </div>
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Tanggal</th>
                                    <th>Check In</th>
                                    <th>Check In</th>
                                    <th>Status</th>
                                    <th>Durasi Telat</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dashboardData.historySchedule.map((item, i) => (
                                <tr key={i}>
                                    <td>{item.date}</td>
                                    <td>{item.checkin}</td>
                                    <td>{item.checkout}</td>
                                    <td><span className="status-badge success">Tepat waktu</span></td>
                                    <td>{item.durasi}</td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </main>
        </>
    )
}



