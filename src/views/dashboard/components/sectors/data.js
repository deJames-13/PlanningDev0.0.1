export const departments = [
    { name: "Director's Office", id: "director" },
    { name: "Planning Office", id: "planning" },
    { name: "Quality Assurance Office", id: "qa" },
    { name: "GAD's Office", id: "gad" },
    { name: "UITC's Office", id: "uitc" },

    {
        name: 'Administrative and Finance Services Division',
        type: 'title',
    },

    { name: "ADAF's Office", id: "adaf" },
    { name: "HRM Office", id: "hrmd" },
    { name: "Accounting Office", id: "accounting" },
    { name: "Budget Office", id: "budget" },
    { name: "Collecting and Disbursing Office", id: "cdo" },
    { name: "Records Office", id: "records" },
    { name: "Procurement Office", id: "procurement" },
    { name: "Property and Supply Office", id: "supply" },
    { name: "Infrastructure Development Office", id: "ido" },
    { name: "Building and Grounds Maintenance", id: "bgm" },
    { name: "Electrical Maintenance", id: "electrical" },
    { name: "HVACR Maintenance", id: "hvacr" },
    { name: "Medical Clinic", id: "medical" },
    { name: "Dental Clinic", id: "dental" },
    { name: "IGP", id: "igp" },

    {
        name: 'Higher Education',
        type: 'title',
    },

    { name: "ADAA's Office", id: "adaa" },
    {
        name: "Basic Arts and Sciences Department",
        children: [
            { name: "BTVTE", id: "btvte" },
        ]
    },
    {
        name: "Civil and Allied Department",
        children: [
            { name: "BSES", id: "bses" },
            { name: "BSCE", id: "bsce" },
            { name: "BETCT", id: "betct" },
            { name: "BETChET", id: "betchet" },
        ]
    },
    {
        name: "Mechanical and Allied Department",
        children: [
            { name: "BSME", id: "bsme" },
            { name: "BETMT", id: "betmt" },
            { name: "BETDMT", id: "betdmt" },
            { name: "BETNDT", id: "betndt" },
            { name: "BETEMET", id: "betemet" },
            { name: "BETHVACR", id: "bethvacr" },
            { name: "BETAT", id: "betat" },
        ]
    },
    {
        name: "Electrical and Allied Department",
        children: [
            { name: "BSEE", id: "bsee" },
            { name: "BSECE", id: "bsece" },
            { name: "BSIT", id: "bsit" },
            { name: "BETET", id: "betet" },
            { name: "BETELEX", id: "betelex" },
            { name: "BETICT", id: "betict" },
            { name: "BETMECT", id: "betmect" },
        ]
    },
    {
        name: "Office of Student Affairs",
        children: [
            { name: "Registrar's Office", id: "registrar" },
            { name: "Learning Resource Center", id: "library" },
            { name: "Guidance Office", id: "guidance" },
            { name: "Sports and Cultural Dev't", id: "sports" },
            { name: "NSTP/ROTC", id: "nstp" },
        ]
    },
    { name: "Industry-Based Program", id: "industry" },
    { name: "USG", id: "usg" },
    { name: "Artisan", id: "artisan" },

    {
        name: 'Research and Extension',
        type: 'title',
    },

    { name: "ADRE's Office", id: "adre" },
    { name: "Research Services", id: "research" },
    { name: "Extension Services", id: "extension" },
];