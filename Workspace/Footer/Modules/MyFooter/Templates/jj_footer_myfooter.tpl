<section class="myfooter-wrapper">
    <!-- Newsletter Bar (Top) -->
    <div class="myfooter-newsletter-bar">
        <div class="myfooter-newsletter-container">
            <p class="myfooter-newsletter-bar-text">{{newsletterText}}</p>
            <form class="myfooter-newsletter-bar-form">
                <input type="email" name="email" class="myfooter-newsletter-bar-input" placeholder="username@domain.com">
                <button type="submit" class="myfooter-newsletter-bar-button">{{newsletterButton}}</button>
            </form>
        </div>
    </div>

    <div class="myfooter-divider"></div>

    <!-- Main Footer Content (Columns) -->
    <div class="myfooter-content">
        <div class="myfooter-columns-container">
            <!-- Column 1: Contact -->
            <div class="myfooter-column myfooter-column-contact">
                <ul class="myfooter-contact-list">
                    {{#if phoneNum}}
                        <li>
                            <i class="fa fa-phone"></i>
                            <a href="tel:{{phoneNum}}">{{phoneNum}}</a>
                        </li>
                    {{/if}}
                    {{#if emailID}}
                        <li>
                            <i class="fa fa-envelope"></i>
                            <a href="mailto:{{emailID}}">{{emailID}}</a>
                        </li>
                    {{/if}}
                    {{#if address}}
                        <li class="myfooter-address-item">
                            <i class="fa fa-map-marker"></i>
                            <div class="myfooter-address-text">
                                {{{address}}}
                            </div>
                        </li>
                    {{/if}}
                </ul>
                <div class="myfooter-logo">
                    <span class="myfooter-logo-text">{{storeName}}</span>
                </div>
            </div>

            <!-- Column 2: Information -->
            <div class="myfooter-column">
                <h4 class="myfooter-column-title">INFORMATION</h4>
                <ul class="myfooter-column-links">
                    {{#each col1Links}}
                        <li><a href="{{href}}" data-touchpoint="{{datatouchpoint}}" data-hashtag="{{datahashtag}}" data-target="{{datatarget}}">{{text}}</a></li>
                    {{/each}}
                </ul>
            </div>

            <!-- Column 3: My Account -->
            <div class="myfooter-column">
                <h4 class="myfooter-column-title">MY ACCOUNT</h4>
                <ul class="myfooter-column-links">
                    {{#each col2Links}}
                        <li><a href="{{href}}" data-touchpoint="{{datatouchpoint}}" data-hashtag="{{datahashtag}}" data-target="{{datatarget}}">{{text}}</a></li>
                    {{/each}}
                </ul>
            </div>

            <!-- Column 4: Social -->
            <div class="myfooter-column">
                <h4 class="myfooter-column-title">SOCIAL</h4>
                <div class="myfooter-social-icons">
                    {{#each socialMediaLinks}}
                        <a href="{{url}}" class="myfooter-social-icon-link" target="_blank" title="{{icon}}">
                            <i class="fa fa-{{icon}} fab fa-{{icon}} icon-{{icon}}"></i>
                        </a>
                    {{/each}}
                </div>
            </div>
        </div>
    </div>

    <!-- Bottom Section (Copyright) -->
    <div class="myfooter-bottom">
        <div class="myfooter-copyright">
            {{{lowerSectionText}}}
        </div>
    </div>
</section>