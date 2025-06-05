const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const flowService = require('../services/flowService');

// POST /api/flows - Create a new flow
router.post(
  '/',
  [
    // Validate that 'name' exists and is not empty
    body('name').notEmpty().withMessage('Flow name is required').trim().escape(),
    // Add other validations as needed, e.g., for the 'diagram' field
    body('diagram').optional().isJSON().withMessage('Diagram must be a valid JSON object if provided'),
  ],
  async (req, res, next) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const flowData = req.body;
      const newFlow = await flowService.createFlow(flowData);
      res.status(201).json({ message: 'Flow created (stub)', data: newFlow });
    } catch (error) {
      next(error);
    }
  }
);

// GET /api/flows - Get all flows
router.get('/', async (req, res, next) => {
  try {
    const flows = await flowService.getAllFlows();
    res.status(200).json({ message: 'All flows retrieved (stub)', data: flows });
  } catch (error) {
    next(error);
  }
});

// GET /api/flows/:id - Get a flow by ID
router.get('/:id', async (req, res, next) => {
  try {
    const flowId = req.params.id;
    const flow = await flowService.getFlowById(flowId);
    if (!flow) {
      return res.status(404).json({ message: 'Flow not found (stub)' });
    }
    res.status(200).json({ message: 'Flow retrieved (stub)', data: flow });
  } catch (error) {
    next(error);
  }
});

// PUT /api/flows/:id - Update a flow by ID
router.put(
  '/:id',
  [
    // Validate that 'name' is not empty if provided, but it's optional for updates
    body('name').optional().notEmpty().withMessage('Flow name cannot be empty if provided').trim().escape(),
    body('description').optional().trim().escape(),
    body('diagram').optional().isJSON().withMessage('Diagram must be a valid JSON object if provided'),
  ],
  async (req, res, next) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const flowId = req.params.id;
      const flowData = req.body;
      const updatedFlow = await flowService.updateFlow(flowId, flowData);
      if (!updatedFlow) {
        return res.status(404).json({ message: 'Flow not found (stub)' });
      }
      res.status(200).json({ message: 'Flow updated (stub)', data: updatedFlow });
    } catch (error) {
      next(error);
    }
  }
);

// DELETE /api/flows/:id - Delete a flow by ID
router.delete('/:id', async (req, res, next) => {
  try {
    const flowId = req.params.id;
    const result = await flowService.deleteFlow(flowId);
    if (!result || !result.success) { // Adjusted based on typical delete service response
      return res.status(404).json({ message: 'Flow not found or could not be deleted (stub)' });
    }
    res.status(200).json({ message: 'Flow deleted (stub)', data: result });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
