export interface Printer {
    printer_id: string;
    printer_name: string;
    printer_ip: string;
    printer_tray: string;
    printer_institution_site_fk: string;
    printer_created_at: string;
    printer_last_update: string;
    printer_is_deleted: string;
    printer_paper_type: string;
}

export interface PrinterList {
    total: number;
    printers: Printer[]
}

export interface PrinterObj {
    printer: Printer
}
