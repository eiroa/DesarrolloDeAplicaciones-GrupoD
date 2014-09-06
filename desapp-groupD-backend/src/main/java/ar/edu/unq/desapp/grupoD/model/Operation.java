package ar.edu.unq.desapp.grupoD.model;

import org.joda.time.DateTime;

import ar.edu.unq.desapp.grupoD.model.category.Category;
import ar.edu.unq.desapp.grupoD.model.payment.PaymentType;

public class Operation {

	private DateTime date;
	private int operationID;
	private double amount;
	private boolean isIncome;
	private String shift;
	private Category category;
	private PaymentType paymentType;

	public DateTime getDate() {
		return date;
	}

	public void setDate(DateTime date) {
		this.date = date;
	}

	public int getOperationID() {
		return operationID;
	}

	/**
	 * Sets the optional operationID.
	 * 
	 * @param operationID
	 */
	public void setOperationID(int operationID) {
		// TODO we need to check if this ID already exists. It could be done
		// against the database once we have it
		this.operationID = operationID;
	}

	public double getAmount() {
		return amount;
	}

	public void setAmount(double amount) {
		this.amount = amount;
	}

	public boolean isIncome() {
		return isIncome;
	}

	public void setIncome(boolean isIncome) {
		this.isIncome = isIncome;
	}

	public String getShift() {
		return shift;
	}

	public void setShift(String shift) {
		this.shift = shift;
	}

	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}

	public PaymentType getPaymentType() {
		return paymentType;
	}

	public void setPaymentType(PaymentType paymentType) {
		this.paymentType = paymentType;
	}

	/**
	 * Returns an instance of a money operation. 
	 * If you need to set an operation ID, use {@link #setOperationID(int)} to set it
	 * @param date
	 *            the date of the operation
	 * @param amount
	 *            amount of the operation in users currency
	 * @param isIncome
	 *            true if it's an income, false if it's an outcome of money
	 * @param shift
	 *            shift when the operation was made
	 * @param category
	 *            used to identify if it's income or outcome
	 * @param paymentType
	 *            how the operation was payed
	 */
	public Operation(DateTime date, double amount, boolean isIncome,
			String shift, Category category, PaymentType paymentType) {
		super();
		this.date = date;
		this.amount = amount;
		this.isIncome = isIncome;
		this.shift = shift;
		this.category = category;
		this.paymentType = paymentType;
		
		this.bill();
	}

	/**
	 * Delegates the billing to the correspondent payment type.
	 */
	private void bill() {
		this.paymentType.bill( this.amount );
	}

}
