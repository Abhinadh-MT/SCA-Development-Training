{{#if showRepresentative}}
<div class="salesperson-card">
    <div class="salesperson-card-container">
        
        {{!-- Left side: Large circular image --}}
        <div class="salesperson-image-column">
            {{#if image}}
                <img src="{{image}}" alt="{{name}}" class="salesperson-image-round">
            {{else}}
                <div class="salesperson-image-placeholder-round">
                    <span>{{name.[0]}}</span>
                </div>
            {{/if}}
        </div>

        {{!-- Right side: Information and Action --}}
        <div class="salesperson-info-column">
            <h2 class="salesperson-card-name">{{name}}</h2>
            <p class="salesperson-card-title">{{title}}</p>
            
            {{#if comments}}
                <p class="salesperson-card-bio">{{comments}}</p>
            {{/if}}

            <div class="salesperson-card-contact-list">
                <p><strong>Email:</strong> <a href="mailto:{{email}}">{{email}}</a></p>
                <p><strong>Phone:</strong> <a href="tel:{{phone}}">{{phone}}</a></p>
                {{#if meetingLink}}
                    <p><strong>LinkedIn:</strong> <a href="{{meetingLink}}" target="_blank">Connect with {{name}}</a></p>
                {{/if}}
            </div>

            {{#if meetingLink}}
                <div class="salesperson-card-button-wrapper">
                    <a href="{{meetingLink}}" class="salesperson-card-green-button" target="_blank">
                        Schedule a Meeting
                    </a>
                </div>
            {{/if}}
        </div>

    </div>
</div>
{{else}}
    {{#unless isLoading}}
        <div class="salesperson-unavailable">
            <p>{{translate 'Your representative information is currently unavailable.'}}</p>
        </div>
    {{/unless}}
{{/if}}