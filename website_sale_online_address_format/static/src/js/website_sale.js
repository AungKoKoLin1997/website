odoo.define("website_sale_online_address_format.website_sale", function(require) {
    "use strict";

    var publicWidget = require('web.public.widget');
    require('website_sale.website_sale');
    publicWidget.registry.WebsiteSale.include({
        /**
         * @private
         */
        // QRTL Edit: Overwrite _changeCountry() method from website_sale
        _changeCountry: function () {
        if (!$("#country_id").val()) {
            return;
        }
        this._rpc({
            route: "/shop/country_infos/" + $("#country_id").val(),
            params: {
                mode: $("#country_id").attr('mode'),
            },
        }).then(function (data) {
            // placeholder phone_code
            $("input[name='phone']").attr('placeholder', data.phone_code !== 0 ? '+'+ data.phone_code : '');

            // populate states and display
            var selectStates = $("select[name='state_id']");
            // dont reload state at first loading (done in qweb)
            if (selectStates.data('init')===0 || selectStates.find('option').length===1) {
                if (data.states.length || data.state_required) {
                    selectStates.html('');
                    _.each(data.states, function (x) {
                        var opt = $('<option>').text(x[1])
                            .attr('value', x[0])
                            .attr('data-code', x[2]);
                        selectStates.append(opt);
                    });
                    selectStates.parent('div').show();
                } else {
                    selectStates.val('').parent('div').hide();
                }
                selectStates.data('init', 0);
            } else {
                selectStates.data('init', 0);
            }

            // manage fields order / visibility
            if (data.fields) {
                // if ($.inArray('zip', data.fields) > $.inArray('city', data.fields)){
                //     $(".div_zip").before($(".div_city"));
                // } else {
                //     $(".div_zip").after($(".div_city"));
                // }
                //QTL EDIT: Sort the Field According to country's online_address_format
                var previous_field = $(".div_street");
                _.each(data.fields, function(field){
                    previous_field.after($(".div_" + field.split("_")[0]));
                    previous_field = $(".div_" + field.split("_")[0]);
                });
                // var all_fields = ["street", "zip", "city", "country_name"]; // "state_code"];
                // QRTL EDIT: Add street2 and state code
                var all_fields = ["street", "street2", "zip", "city", "country_name", "state_code"];
                _.each(all_fields, function (field) {
                    $(".checkout_autoformat .div_" + field.split('_')[0]).toggle($.inArray(field, data.fields)>=0);
                });
            }

            if ($("label[for='zip']").length) {
                $("label[for='zip']").toggleClass('label-optional', !data.zip_required);
                $("label[for='zip']").get(0).toggleAttribute('required', !!data.zip_required);
            }
            if ($("label[for='zip']").length) {
                $("label[for='state_id']").toggleClass('label-optional', !data.state_required);
                $("label[for='state_id']").get(0).toggleAttribute('required', !!data.state_required);
            }
        });
    },
    });
});
