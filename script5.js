// JavaScript for split hover effects
document.querySelectorAll('.split').forEach(function(split) {
    split.addEventListener('mouseenter', function() {
        split.style.flex = '2';
        split.querySelector('.split-image').style.transform = 'scale(1.1)';
    });

    split.addEventListener('mouseleave', function() {
        split.style.flex = '1';
        split.querySelector('.split-image').style.transform = 'scale(1)';
    });
});

