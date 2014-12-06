//-----------------------------------------------------------------
// Licensed Materials - Property of IBM
//
// WebSphere Commerce
//
// (C) Copyright IBM Corp. 2009 All Rights Reserved.
//
// US Government Users Restricted Rights - Use, duplication or
// disclosure restricted by GSA ADP Schedule Contract with
// IBM Corp.
//-----------------------------------------------------------------

//<%--
//********************************************************************


/**
 * @fileOverview This class contains key-value paired variables that are
 * mapped to their respective services. The variables are used to determine
 * which refresh areas to update. For example, the order_updated variable is
 * used update order related refresh areas.
 */


/**
 * map order_updated to all the services that result in changes to an order
 * @static
 */
var order_updated = {	'AjaxAddOrderItem':'AjaxAddOrderItem',
											'AjaxAddOrderItemWithShipingInfo':'AjaxAddOrderItemWithShipingInfo',
											'AjaxDeleteOrderItem':'AjaxDeleteOrderItem',
											'AjaxUpdateOrderItem':'AjaxUpdateOrderItem',
											'AjaxUpdateOrderShippingInfo':'AjaxUpdateOrderShippingInfo',
											'AjaxOrderCalculate':'AjaxOrderCalculate',
											'AjaxLogoff':'AjaxLogoff',
											'AjaxSetPendingOrder':'AjaxSetPendingOrder',
											'AjaxUpdatePendingOrder':'AjaxUpdatePendingOrder',
											'AjaxSingleOrderCancel':'AjaxSingleOrderCancel',
											'AjaxUpdateRewardOption':'AjaxUpdateRewardOption'
										};

/**
 *  map address_updated to all the services that result in changes to a shopper's
 *  address book
 *  @static
 */
var address_updated = {	'AjaxDeleteAddressForPerson':'AjaxDeleteAddressForPerson',
			'AjaxAddAddressForPerson':'AjaxAddAddressForPerson',
			'AjaxUpdateAddressForPerson':'AjaxUpdateAddressForPerson',
			'AjaxAddShippingAndBillingAddressForPersonDuringCheckout':'AjaxAddShippingAndBillingAddressForPersonDuringCheckout'
		};

/**
 *  map user_changed to all the services that result in the user in session
 *  change
 *  @static
 */
var user_changed = {	'AjaxLogonService':'AjaxLogonService',
											'AjaxLogoff':'AjaxLogoff'
										};

/**
 *  map wishlist_changed to all the services that result in the changes to a wish list
 *  @static
 */
var wishlist_changed = {	'AjaxInterestItemAdd':'AjaxInterestItemAdd',
												'AjaxInterestItemDelete':'AjaxInterestItemDelete',
												'AjaxLogonService':'AjaxLogonService',
												'AjaxLogoff':'AjaxLogoff'
											};
/**
 *  map listorders_changed to all the services that result in the changes to the list of saved orders
 *  @static
 */
var listorders_changed = { 'AjaxOrderCreate':'AjaxOrderCreate',
		 				  'AjaxSingleOrderCancel':'AjaxSingleOrderCancel',
		 				   'AjaxSingleOrderSave':'AjaxSingleOrderSave',
		 				   'AjaxCurrentOrderCalculate':'AjaxCurrentOrderCalculate',
		 				   'AjaxSingleOrderCalculate':'AjaxSingleOrderCalculate',
		 				   'AjaxAddOrderItem':'AjaxAddOrderItem'};
