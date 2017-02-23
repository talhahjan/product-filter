# Sass media query mixins

## Usage

    // Media query breakpoints

    $media-small-start: 0;
    $media-medium-start: 640px;
    $media-large-start: 1280px;

    // Import

    @import "node_modules/sass-media-mixins/index";

    // Media query mixins

    .my-selector {
      @include media-small {}
      @include media-medium {}
      @include media-large {}
      @include media-small-and-medium {}
      @include media-medium-and-large {}
    }