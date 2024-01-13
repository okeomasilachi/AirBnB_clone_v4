{/* <div class="popover">
    <ul>
        {% for amenity in amenities %}
        <li>{{ amenity.name }}</li>
        {% endfor %}
    </ul>
</div> */}
$(() => {
    $('.amenities .popover li').addClass("in-line");
    $('.amenities .popover li').before('<input type="checkbox" />').addClass("in-line");
});