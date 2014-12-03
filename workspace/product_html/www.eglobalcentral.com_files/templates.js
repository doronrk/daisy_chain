Searchaise_templates = {
	SearchInput: '#snize-input',
	AutocompleteShow: true,
	AutocompleteStyle: 'ITEMS',
	AutocompleteItemCount: '3',
	AutocompletePagesCount: 3,
	AutocompleteCategoriesCount: 3,
	AutocompleteSuggestionCount: '4',
	AutocompleteHighlight: true,
	AutocompleteSuggestionSearchItemCount: '3',
	AutocompleteShowViewAllLink: true,
	AutocompleteShowBrand: true,
	AutocompleteShowPrice: true,
	AutocompleteShowProductImages: true,
	AutocompleteShowRecent: false,
	AutocompleteShowMobileWidget: false,
	AutocompleteShowEmptyFieldHTML: false,
	AutocompleteShowResultsHTML: false,
	AutocompleteShowNoResultsHTML: false,
	LabelMoreProducts: 'View all [count] items',
	LabelNothingFound: 'Sorry, nothing found for [search_string].',
	AutocompleteItem: '<li class="snize-ac-odd snize-product">	<a href="${link}" class="snize-item clearfix">		<span class="snize-thumbnail">			${image2}		</span>		<span class="snize-overhidden">			<span class="snize-title">${title}</span>			<span class="snize-description">${description}</span>			<span class="snize-price">${price}</span>		</span>	</a></li>',
	AutocompletePreview: '<div class="snize-clear"><a href="${link}" class="snize-title">${title}</a><a href="${link}"><div class="snize-thumbnail">${image3}</div></a><span class="snize-price">Price: $${price}</span>{{if quantity > 0}}<span class="snize-in-stock">In stock</span>{{else}}<span class="snize-out-of-stock">Out of stock</span>{{/if}}<a href="${link}" class="text-button snize-view-link">View product page</a><div class="snize-clear"></div></div>{{if description}}<div class="snize-description"><h3 class="snize-header">Description:</h3>${description}</div>{{/if}}'
};
