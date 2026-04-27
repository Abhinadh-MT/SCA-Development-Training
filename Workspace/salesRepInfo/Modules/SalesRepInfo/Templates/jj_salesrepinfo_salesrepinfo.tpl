{{#if showRepresentative}}
<section class="salesrepinfo-card">
    <div class="salesrepinfo-card-header">
        <h3 class="salesrepinfo-card-title">{{translate 'Your Representative'}}</h3>
    </div>
    <div class="salesrepinfo-card-content">
        <div class="salesrepinfo-card-image-container">
            {{#if image}}
                <img src="{{image}}" alt="{{name}}" class="salesrepinfo-card-image">
            {{else}}
                <div class="salesrepinfo-card-image-placeholder">
                    <span>{{name.[0]}}</span>
                </div>
            {{/if}}
        </div>
        <div class="salesrepinfo-card-details">
            <h4 class="salesrepinfo-card-name">{{name}}</h4>
            {{#if title}}
                <p class="salesrepinfo-card-title-text">{{title}}</p>
            {{/if}}
            
            <div class="salesrepinfo-card-contact">
                {{#if email}}
                    <div class="salesrepinfo-card-contact-item">
                        <span class="salesrepinfo-card-contact-label">{{translate 'Email:'}}</span>
                        <a href="mailto:{{email}}" class="salesrepinfo-card-contact-link">{{email}}</a>
                    </div>
                {{/if}}
                
                {{#if phone}}
                    <div class="salesrepinfo-card-contact-item">
                        <span class="salesrepinfo-card-contact-label">{{translate 'Phone:'}}</span>
                        <a href="tel:{{phone}}" class="salesrepinfo-card-contact-link">{{phone}}</a>
                    </div>
                {{/if}}

                {{#if meetingLink}}
                    <div class="salesrepinfo-card-contact-item salesrepinfo-card-button-container">
                        <a href="{{meetingLink}}" target="_blank" class="salesrepinfo-card-button">
                            {{translate 'Schedule a Meeting'}}
                        </a>
                    </div>
                {{/if}}
            </div>
        </div>
    </div>
</section>
{{else}}
    {{#unless isLoading}}
        <div class="salesrepinfo-unavailable">
            <p>{{translate 'Your representative information is currently unavailable.'}}</p>
        </div>
    {{/unless}}
{{/if}}