// @module JJ.salesRepInfo.SalesRepInfo
define('JJ.salesRepInfo.SalesRepInfo.View'
,	[
	'jj_salesrepinfo_salesrepinfo.tpl'
	
	,	'JJ.salesRepInfo.SalesRepInfo.SS2Model'
	
	,	'Backbone'
    ]
, function (
	jj_salesrepinfo_salesrepinfo_tpl
	
	,	SalesRepInfoSS2Model
	
	,	Backbone
)
{
    'use strict';


	return Backbone.View.extend({

		template: jj_salesrepinfo_salesrepinfo_tpl

	,	initialize: function (options) {
			this.model = new SalesRepInfoSS2Model();
			var self = this;
			this.isLoading = true;
			console.log('Fetching model...');
			this.model.fetch().done(function() {
				self.isLoading = false;
				console.log('Model: ' + JSON.stringify(self.model.attributes));
				self.render();
			}).fail(function() {
				self.isLoading = false;
				console.log('Failed to fetch model');
				self.render();
			});
		}

	,	getContext: function getContext()
		{
			var assigned = this.model.get('assigned');
			
			return {
				isLoading: this.isLoading,
				assigned: assigned,
				name: this.model.get('name'),
				title: this.model.get('title'),
				email: this.model.get('email'),
				phone: this.model.get('phone'),
				image: this.model.get('image'),
				meetingLink: this.model.get('meeting_link'),
				showRepresentative: assigned && !this.isLoading
			};
		}
	});
});

