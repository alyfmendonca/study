export interface getModalidades {
    institutionSite: [
        {
            institution_site_id: string,
            name: string,
            institution_fk: string,
            address: string,
            city: string,
            state: string,
            uf: string,
            zip_code: string,
            cache_url: string,
            print_spooler_url: string,
            is_deleted: string,
            created_at: string,
            last_update: string,
            fk_media_type: string
        }
        ],
    dicomTags: [
        {
            n_dicom_tags_id: string,
            tag: string,
            display_text: string,
            is_deleted: string,
            created_at: string,
            last_update: string
        },
    ],
    modalities: [
        {
            modality_id: string,
            full_name: string,
            initials: string,
            is_deleted: string,
            created_at: string,
            last_update: string
        },
    ],
    paperSizes: [
        {
            paper_size_id: string,
            paper_size_type: string,
            paper_size_create_date: string
        },
    ]
}

export interface singleDicomTag {
    n_dicom_tags_id?: string,
    tag?: string,
    display_text?: string,
    tag_positioning_id?: string,
    dicom_tag_id_fk?: string,
    positioning?: string,
    fk_modality?: string,
    is_deleted?: string,
    institution_fk?: string,
    last_update? : string,
}

  
