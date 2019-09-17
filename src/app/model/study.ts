export interface Study {
  study_id: string;
  accession_number: string;
  description: string;
  mod_full_name: string;
  study_date: string;
  institution_site_id: string;
  patient_fk: string;
  serie_id: string;
  inst_site_name: string;
  pat_full_name: string;
  c_boolean_print: string;
  c_booblean_saved: string;
}

export interface StudyFilter{
  total: number;
  exams: Study[];
}


