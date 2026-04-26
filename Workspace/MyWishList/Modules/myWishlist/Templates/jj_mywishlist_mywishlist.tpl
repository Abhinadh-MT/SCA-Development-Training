<div class="wishlist-integrated-container" style="position: relative; display: inline-block; width: 100%; text-align: center;">
    {{!-- 1. THE VISUAL HEART ICON --}}
<button class="wishlist-icon-btn" 
            data-action="toggle-wishlist" 
            style="background: none !important; border: none !important; cursor: pointer !important; font-size: 32px !important; color: #e74c3c !important; outline: none !important;"
            title="{{#if inWishlist}}Remove from Wishlist{{else}}Add to Wishlist{{/if}}">
<span class="heart-symbol" style="transition: transform 0.2s ease;">
            {{#if inWishlist}}❤{{else}}♡{{/if}}
</span>
</button>
 
    {{!-- 2. THE NATIVE TRIGGER (Hidden but functional) --}}
<div class="native-wishlist-trigger-wrapper" style="display: none !important;">
        {{#if isMoving}}
<button class="product-list-control-button-move" data-action="show-productlist-control" data-toggle="showFlyout" type="button">
                {{translate 'Move'}}
</button>
        {{else}}
<button class="product-list-control-button-wishlist" data-action="show-productlist-control" data-toggle="showFlyout" type="button" >
                {{translate 'Add to Wishlist'}}
</button>
        {{/if}}
</div>
 
    {{!-- 3. THE FLYOUT / DROPDOWN CONTAINER --}}
<div class="wishlist-dropdown-container" 
         style="position: absolute; top: 100%; left: 50%; transform: translateX(-50%); z-index: 10000; background: white; {{#if showMenu}}display: block !important;{{else}}display: none !important;{{/if}}">
    <div data-view="ProductListControl"></div>
</div>
 
</div>