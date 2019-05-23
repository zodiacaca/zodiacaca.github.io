---
layout: page
title: "Product Documentation"
date: 2017-01-05 13:00:00 -0800
categories: post
tags:
cover: /images/post/2017-01-05--1.png
comment: true
---
There are two syntaxes available for Sass. The first, known as SCSS (Sassy CSS) and used throughout this reference, is an extension of the syntax of CSS. This means that every valid CSS stylesheet is a valid SCSS file with the same meaning.
{: .intro }
{% include section-title.html title="1.How to use" %}
The second and older syntax, known as the indented syntax (or sometimes just "Sass"), provides a more concise way of writing CSS. It uses indentation rather than brackets to indicate nesting of selectors, and newlines rather than semicolons to separate properties. Some people find this to be easier to read and quicker to write than SCSS. The indented syntax has all the same features, although some of them have slightly different syntax; this is described in the indented syntax reference. Files using this syntax have the .sass extension.
{% include section-title.html title="2.Misc." %}
A color model determines the relationship between values, and the color space defines the absolute meaning of those values as colors. Some color models (such as CIE L*a*b) have a fixed color space because they relate directly to the way humans perceive color. These models are described as being device-independent. Other color models (RGB, HSL, HSB, CMYK, and so forth) can have many different color spaces. Because these models vary with each associated color space or device, they are described as being device-dependent.