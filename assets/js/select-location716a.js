$(document).ready(function () {
    // country_region_list_init();

    $("#region-select").on("change", function () {
        $("#country-select").val("");
        $("#country-select").change();
        $("#country-select option:not([value=''])").remove();
        var options = $(
            "#country-options option" + ($(this).val() != "" ? "[data-region=" + $(this).val() + "]" : "")
        )
            .clone()
            .appendTo("#country-select");
    }).trigger("change");
    $("#country-select").on("change", function () {
        if ($(this).val()) {
            var country_id = $(this).val();
            var permalink = $("#" + country_id).attr("data-permalink");
            window.location.href = permalink;
            // window.location.replace(permalink);
        }
    });
});
/*
function country_region_list_init() {
  var region_id = $("#region-select").val();
  if (region_id) {
    $('#country-select option:not([value=""])').hide();
    $("#country-select option.country-region-" + region_id).show();
  }
}
*/
