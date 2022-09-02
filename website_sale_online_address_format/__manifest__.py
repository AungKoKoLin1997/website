{
    "name": "Countires' Online Address Format",
    "version": "15.0.1.0.0",
    "author": "Quartile Limited ," "Odoo Community Association (OCA)",
    "website": "https://github.com/OCA/website",
    "category": "Website",
    "license": "LGPL-3",
    "summary": "",
    "depends": ["website_sale"],
    "data": ["views/res_country_views.xml"],
    "assets": {
        'web.assets_frontend': [
            "website_sale_online_address_format/static/src/js/website_sale.js",
        ],
    },
    "installable": True,
}
