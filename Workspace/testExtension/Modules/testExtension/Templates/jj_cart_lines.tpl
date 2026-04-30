<div id="{{lineId}}" data-item-id="{{itemId}}" data-type="order-item" class="{{#if showGeneralClass}} {{generalClass}} {{/if}} cart-lines-row">
	<div class="cart-lines-table-first">
		<div class="cart-lines-thumbnail">
			<div data-view="ItemThumbnail"></div>
			{{#if isNavigable}}
				<a {{{linkAttributes}}}>
					<img src="{{resizeImage thumbnail.url 'thumbnail'}}" alt="{{thumbnail.altimagetext}}">
				</a>
			{{else}}
				<img src="{{resizeImage thumbnail.url 'thumbnail'}}" alt="{{thumbnail.altimagetext}}">
			{{/if}}
		</div>
	</div>
	<div class="cart-lines-table-middle">
		<div class="cart-lines-name">
		{{#if isNavigable}}
			<a {{{linkAttributes}}} class="cart-lines-name-link">
				{{item._name}}
			</a>
		{{else}}
				<span class="cart-lines-name-viewonly">{{item._name}}</span>
		{{/if}}
		</div>
		<div class="cart-lines-price">
			<div data-view="Item.Price"></div>
		</div>
		<div data-view="Item.Sku"></div>
		<div data-view="Item.Tax.Info"></div>

		<div class="cart-lines-options">
			<div data-view="Item.SelectedOptions"></div>
		</div>

        <!-- START OF CUSTOM DELIVERY SECTION (FROM EXTENSION) -->
        {{#if showDeliverySection}}
          <section class="testextension-delivery" style="margin-top: 15px; margin-bottom: 15px; padding: 10px; border: 1px solid #e3e3e3; border-radius: 4px; background-color: #f9f9f9;">
              <h4 class="testextension-delivery__title" style="margin-top: 0; font-size: 14px;">Custom Delivery Details</h4>
              
              <p class="testextension-delivery__info" style="margin-bottom: 5px; font-size: 13px;">Expected Delivery: <strong>{{custitem_expected_delivery}}</strong></p>
              <p class="testextension-delivery__note" style="margin-bottom: 5px; font-size: 13px;">Special Note: <em>{{custcol_special_note}}</em></p>
              
              <div class="testextension-delivery__form-group" style="margin-top: 5px;">
                <label class="testextension-delivery__label" style="display: block; font-size: 12px; margin-bottom: 2px;">Delivery Note Instructions:</label>
                <input type="text" class="testextension-delivery__input" readonly style="width: 100%; padding: 4px; font-size: 12px; border: 1px solid #ccc; background-color: #eee;" value="{{custcol_delivery_note}}"/>
              </div>
              
              {{#if showWarrantyInfo}}
                 <button class="testextension-delivery__button" data-action="show-warranty-info" style="margin-top: 5px; padding: 4px 8px; font-size: 11px; background-color: #4bc53e; color: white; border: none; border-radius: 3px; cursor: pointer;">
                    View Warranty Info
                 </button>
              {{/if}}
          </section>
        {{/if}}
        <!-- END OF CUSTOM DELIVERY SECTION -->

		{{#if showSummaryView}}
			<div class="cart-lines-summary" data-view="Item.Summary.View"></div>
		{{/if}}

		<div data-view="StockDescription"></div>

        <div class="cart-lines-item-actions-desktop" data-view="Item.Actions.View"></div>
	</div>
	<div class="cart-lines-table-last">
		<div class="cart-lines-item-actions-mobile" data-view="Item.Actions.View"></div>

        <div class="cart-lines-shipping-method" data-view="CartLines.PickupInStore"></div>

		<div class="cart-lines-stock" data-view="Product.Stock.Info"></div>

		{{#if showAlert}}
			<div class="alert alert-{{customAlertType}}">
				{{item._cartCustomAlert}}
			</div>
		{{/if}}

		{{#if showCustomAlert}}
			<div class="alert alert-{{customAlertType}}">
				{{item._cartCustomAlert}}
			</div>
		{{/if}}
	</div>
</div>
