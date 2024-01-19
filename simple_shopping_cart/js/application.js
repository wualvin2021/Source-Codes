$(document).ready(function() {  
  console.log('ready')

  var removeItem = function() {
    $(this).closest('tr').remove();
    updateGrandTotal();
  };
  $(document).on('click', '.remove', removeItem);

  var updateGrandTotal = function() {
    //get subtotals
    var grandTotal = 0;
    $('#cart .subtotal').each(function(index) {
      grandTotal += parseFloat($(this).html().substring(1)) || 0;
    })

    $('#grandtotal').html('$'+grandTotal);
  }

  var updateCost = function(e) {
    var target = e.target;
    var qty = Number(target.value || 0); 

    var price = parseFloat($(target).closest('tr').find('.price').html().substring(1));

    var subtotal = price * (qty || 0);

    $(target).closest('tr').find('.subtotal').html('$'+subtotal.toFixed(2));

    updateGrandTotal();
  }

  var timeout;
  $('#cart').on('change', '.qty input', function (e) {
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      updateCost(e);
    }, 500);
  });

  // todo:
  // 1. calculate all subtotal of items and update DOM
  // 2. calculate grand total based on subtotals
   
  $('#addItem').on('submit', function (event) {
    event.preventDefault();
    var name = $(this).children('[name=name]').val();
    var price = $(this).children('[name=price]').val();

    $('tbody').append('<tr>' +
    '<td class="name">' + name + '</td>' +
    '<td class="price">$' + price + '</td>' +
    '<td class="qty"><b>QTY</b><input type="number" value="0" /></td>' +
    '<td class="subtotal">$--.--</td>' +
    '<td><button class="btn btn-light btn-sm remove">remove</button></td>' +
    '</tr>');
    
    $(this).children('[name=name]').val('');
    $(this).children('[name=price]').val('');
  })
    $(document).on('click', '.add', addItem);
  });
