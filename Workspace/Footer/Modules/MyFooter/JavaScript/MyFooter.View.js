// @module JJ.Footer.MyFooter
define('JJ.Footer.MyFooter.View'
,	[
	'jj_footer_myfooter.tpl'
	,	'SC.Configuration'
	,	'Backbone'
	,	'underscore'
    ]
, function (
	jj_footer_myfooter_tpl
	,	Configuration
	,	Backbone
	,	_
)
{
    'use strict';

	// @class JJ.Footer.MyFooter.View @extends Backbone.View
	return Backbone.View.extend({

		template: jj_footer_myfooter_tpl

	,	initialize: function (options) {
		}

	,	getContext: function getContext()
		{
			var footerConfig = this.options.configuration || {};
			var copyright = footerConfig.copyright || {};
			
			// Multi-column links from the configuration (strictly lowercase key)
			var multiColumnLinks = footerConfig.multicolllinks || [];
			
			// Group links by column
			var col1Links = _.filter(multiColumnLinks, function(link) { return link.column === 'Column 1'; });
			var col2Links = _.filter(multiColumnLinks, function(link) { return link.column === 'Column 2'; });
			var col3Links = _.filter(multiColumnLinks, function(link) { return link.column === 'Column 3'; });
			var col4Links = _.filter(multiColumnLinks, function(link) { return link.column === 'Column 4'; });

			return {
				// Corrected mappings for nested properties
				showLegacyNewsletter: footerConfig.showlegacynewsletter || false
			,	hideCopyright: copyright.hide || false
			,	companyName: copyright.companyname || ''
			,	phoneNum: copyright.phonenum || ''
			,	emailID: copyright.emailid || ''
			,	storeName: copyright.storename || ''
			,	address: copyright.address || ''
			,	initialYear: copyright.initialyear || ''
			,	upperSectionTitle: copyright.title || ''
			,	multiCollLinks: multiColumnLinks
			,	socialMediaLinksTitle: footerConfig.sociallinkstitle || ''
			,	socialMediaLinks: footerConfig.sociallinks || []
				
			,	col1Links: col1Links
			,	col2Links: col2Links
			,	col3Links: col3Links
			,	col4Links: col4Links
				
			,	newsletterText: footerConfig.newslettertext
			,	newsletterButton: footerConfig.newsletterbutton
			,	lowerSectionText: footerConfig.lowersectiontext || ''
			};
		}
	});
});
