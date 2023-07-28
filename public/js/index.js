$(document).ready(function () {

    /*
    TODO:   The code below attaches a `keyup` event to `#refno` text field.
            The code checks if the current reference number entered by the user
            in the text field does not exist in the database.

            If the current reference number exists in the database:
            - `#refno` text field background color turns to red
            - `#error` displays an error message `Reference number already in
            the database`
            - `#submit` is disabled

            else if the current reference number does not exist in the
            database:
            - `#refno` text field background color turns back to `#E3E3E3`
            - `#error` displays no error message
            - `#submit` is enabled
    */
    $('#refno').keyup(function () {
        var refno = $(`#refno`);

        $.get(`/getCheckRefNo:refno`,
                {
                    refno: refno.val()
                }, 
                function(result) {
                    if (result) {
                        $(`#refno`).css(`background-color`, `red`);
                        $(`#error`).text(`Reference number already in the database`);
                        $(`#submit`).prop(`disabled`, true);
                    }
                    else
                    {
                        $(`#refno`).css(`background-color`, ``);
                        $(`#error`).text(``);
                        $(`#submit`).prop(`disabled`, false);
                    }
            });

    });

    /*
    TODO:   The code below attaches a `click` event to `#submit` button.
            The code checks if all text fields are not empty. The code
            should communicate asynchronously with the server to save
            the information in the database.

            If at least one field is empty, the `#error` paragraph displays
            the error message `Fill up all fields.`

            If there are no errors, the new transaction should be displayed
            immediately, and without refreshing the page, after the values
            are saved in the database.

            The name, reference number, and amount fields are reset to empty
            values.
    */
    $('#submit').click(function () {
        var name = $(`#name`);
        var refno = $(`#refno`);
        var amount = $(`#amount`);

        if (!name.val() | !refno.val() | !amount.val()) {
            // IF does not exist
            $(`#error`).text(`Fill up all fields.`);
        }
        else  {
            // ELSE exists
            console.log(name.val());
            console.log(refno.val());
            console.log(amount.val());

            // AJAX get request
            $.get(`/add:name:refno:amount`,
                {
                    name: name.val(), 
                    refno: refno.val(), 
                    amount: amount.val()
                }, 
                function(result) {
                
                console.log(result);

                $(`#cards`).prepend(result);
                
            });

            // Clear Fields
            name.val("");
            refno.val("");
            amount.val("");
        }
        
    });

    /*
    TODO:   The code below attaches a `click` event to `.remove` buttons
            inside the `<div>` `#cards`.
            The code deletes the specific transaction associated to the
            specific `.remove` button, then removes the its parent `<div>` of
            class `.card`.
    */
    $('#cards').on('click', '.remove', function () {
        // your code here
        var button = $(this);
        var refno = button.siblings(".info").find("p:eq(1)").text();

        $.get(`/delete:refno`,
            {
                refno: refno
            }, 
            function(result) {
                button.parent('.card').remove();
        });
    });

})
